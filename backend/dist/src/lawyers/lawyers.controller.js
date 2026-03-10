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
exports.LawyersController = void 0;
const common_1 = require("@nestjs/common");
const lawyers_service_1 = require("./lawyers.service");
const create_lawyer_profile_dto_1 = require("./dto/create-lawyer-profile.dto");
const update_lawyer_profile_dto_1 = require("./dto/update-lawyer-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let LawyersController = class LawyersController {
    lawyersService;
    constructor(lawyersService) {
        this.lawyersService = lawyersService;
    }
    async findAll(search, specialization, page, limit) {
        return this.lawyersService.findAll({
            search,
            specialization,
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }
    async findOne(id) {
        return this.lawyersService.findOne(id);
    }
    async getMyProfile(req) {
        return this.lawyersService.getMyProfile(req.user.sub);
    }
    async createProfile(req, dto) {
        return this.lawyersService.createProfile(req.user.sub, dto);
    }
    async updateProfile(req, dto) {
        return this.lawyersService.updateProfile(req.user.sub, dto);
    }
    async getDashboardStats(req) {
        return this.lawyersService.getDashboardStats(req.user.sub);
    }
};
exports.LawyersController = LawyersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('specialization')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.LAWYER),
    (0, common_1.Get)('my-profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.LAWYER),
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lawyer_profile_dto_1.CreateLawyerProfileDto]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.LAWYER),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_lawyer_profile_dto_1.UpdateLawyerProfileDto]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.LAWYER),
    (0, common_1.Get)('dashboard/stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LawyersController.prototype, "getDashboardStats", null);
exports.LawyersController = LawyersController = __decorate([
    (0, common_1.Controller)('lawyers'),
    __metadata("design:paramtypes", [lawyers_service_1.LawyersService])
], LawyersController);
//# sourceMappingURL=lawyers.controller.js.map