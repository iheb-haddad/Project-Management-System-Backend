"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const project_entity_1 = require("./entities/project.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository, usersService) {
        this.projectsRepository = projectsRepository;
        this.usersService = usersService;
    }
    async create(createProjectDto) {
        const existingProject = await this.projectsRepository.findOneBy({
            name: createProjectDto.name,
        });
        if (existingProject) {
            throw new common_1.HttpException('Project already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const existManager = await this.usersService.findOneById(createProjectDto.manager_id);
        if (!existManager) {
            throw new common_1.HttpException('Manager does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const newProject = await this.projectsRepository.save(createProjectDto);
        return {
            id: newProject.id,
            name: newProject.name,
            manager: existManager.username,
        };
    }
    async findAll() {
        return this.projectsRepository.find();
    }
    async findOne(id) {
        return this.projectsRepository.findOneBy({ id });
    }
    async update(id, updateProjectDto) {
        await this.projectsRepository.update(id, updateProjectDto);
        return this.projectsRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.projectsRepository.delete(id);
        return {
            status: 'success',
            message: 'Project deleted successfully',
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map