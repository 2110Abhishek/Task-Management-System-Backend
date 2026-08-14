import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument, TaskStatus, TaskPriority } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    if (!createTaskDto.createdBy || !createTaskDto.assignees || createTaskDto.assignees.length === 0) {
      let dexter = await this.userModel.findOne({ name: 'Dexter' }).exec();
      if (!dexter) {
        dexter = await this.userModel.create({
          email: 'dexter@example.com',
          name: 'Dexter',
          avatar: 'https://i.pravatar.cc/150?u=dexter',
          passwordHash: 'dummy',
        });
      }
      if (!createTaskDto.createdBy) {
        createTaskDto.createdBy = dexter._id as any;
      }
      if (!createTaskDto.assignees || createTaskDto.assignees.length === 0) {
        createTaskDto.assignees = [dexter._id as any];
      }
    }
    const createdTask = new this.taskModel(createTaskDto);
    const saved = await createdTask.save();
    return this.taskModel.findById(saved._id).populate('assignees').populate('createdBy').exec() as Promise<TaskDocument>;
  }

  async findAll(): Promise<TaskDocument[]> {
    const count = await this.taskModel.countDocuments().exec();
    if (count === 0) {
      await this.seedTasks();
    }
    return this.taskModel.find().populate('assignees').populate('createdBy').exec();
  }

  private async seedTasks() {
    let dexter = await this.userModel.findOne({ name: 'Dexter' }).exec();
    if (!dexter) {
      dexter = await this.userModel.create({
        email: 'dexter@example.com',
        name: 'Dexter',
        avatar: 'https://i.pravatar.cc/150?u=dexter',
        passwordHash: 'dummy',
      });
    }

    const getOrCreateUser = async (name: string, seed: string) => {
      let u = await this.userModel.findOne({ name }).exec();
      if (!u) {
        u = await this.userModel.create({
          email: `${seed}@example.com`,
          name,
          avatar: `https://i.pravatar.cc/150?u=${seed}`,
          passwordHash: 'dummy',
        });
      }
      return u;
    };

    const qaTeam = await getOrCreateUser('QA Team', 'qa_team');
    const designer = await getOrCreateUser('Designer', 'designer');
    const security = await getOrCreateUser('Security', 'security');
    const design = await getOrCreateUser('Design', 'design');
    const devTeam = await getOrCreateUser('Dev Team', 'dev_team');
    const product = await getOrCreateUser('Product', 'product');
    const engineering = await getOrCreateUser('Engineering', 'engineering');

    const tasksToSeed = [
      {
        title: 'Write API Documentation',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2026-07-29'),
        assignees: [dexter._id],
        createdBy: dexter._id,
        tags: ['Deployment', 'Deployment']
      },
      {
        title: 'Implement Search Function',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2026-07-29'),
        assignees: [dexter._id],
        createdBy: dexter._id,
        tags: ['Deployment', 'Deployment']
      },
      {
        title: 'Deploy to Production',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2026-07-29'),
        assignees: [dexter._id],
        createdBy: dexter._id,
        tags: ['Deployment', 'Deployment']
      },
      {
        title: 'Code Review Completed',
        status: TaskStatus.DOING,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2026-07-29'),
        assignees: [dexter._id],
        createdBy: dexter._id,
        tags: ['Deployment', 'Deployment']
      },
      {
        title: 'Design Mockups Finalized',
        status: TaskStatus.DOING,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-07-29'),
        assignees: [dexter._id],
        createdBy: dexter._id,
        tags: ['Deployment', 'Deployment']
      },
      {
        title: 'Feature Testing Passed',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2026-07-30'),
        assignees: [qaTeam._id],
        createdBy: dexter._id,
        tags: ['Testing', 'Passed']
      },
      {
        title: 'UI Design Updated',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-07-31'),
        assignees: [designer._id],
        createdBy: dexter._id,
        tags: ['Design', 'Updated']
      },
      {
        title: 'Security Audit Scheduled',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2026-08-01'),
        assignees: [security._id],
        createdBy: dexter._id,
        tags: ['Audit', 'Scheduled']
      },
      {
        title: 'UI Review',
        status: TaskStatus.ON_HOLD,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-07-29'),
        assignees: [design._id],
        createdBy: dexter._id,
        tags: ['Review']
      },
      {
        title: 'Backend Integration',
        status: TaskStatus.ON_HOLD,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2026-07-29'),
        assignees: [devTeam._id],
        createdBy: dexter._id,
        tags: ['Development']
      },
      {
        title: 'User Feedback collection',
        status: TaskStatus.ON_HOLD,
        priority: TaskPriority.LOW,
        dueDate: new Date('2026-07-29'),
        assignees: [product._id],
        createdBy: dexter._id,
        tags: ['Research']
      },
      {
        title: 'Performance tuning',
        status: TaskStatus.ON_HOLD,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2026-07-29'),
        assignees: [engineering._id],
        createdBy: dexter._id,
        tags: ['Optimization']
      }
    ];

    for (const t of tasksToSeed) {
      await this.taskModel.create(t as any);
    }
  }

  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).populate('assignees').populate('createdBy').exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .populate('assignees')
      .populate('createdBy')
      .exec();
    
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  async remove(id: string): Promise<TaskDocument> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return deletedTask;
  }
}
