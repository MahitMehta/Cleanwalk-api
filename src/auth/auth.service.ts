import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UserService } from "src/user/user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { SignOptions } from 'jsonwebtoken';
import { IUserModel } from "src/user/interfaces/user.interface";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    public async createUser({ pass, email:rawEmail, ...fields } : CreateUserDTO) {
        const email = rawEmail.toLowerCase();
        const hashedPassword = await this.hashPassword(pass);
        const response = await this.userService.create({ pass:hashedPassword, email, ...fields }).catch(_ => null);
        if (!response) return new InternalServerErrorException('Failed to Create Account');
    
        const { _id:userId } = response; 
        const clientObject = await this.clientObject(userId);
        return clientObject;
    }

    public async loginUser({ email:rawEmail, pass }) {
        const email = rawEmail.toLowerCase();
        const [ user ] : IUserModel[] = await this.userService.findByEmail(email);
        if (!user) return new BadRequestException("No Such User Exists with the Provided Email.");
        else if (!await this.validateUserPassword(pass, user.pass)) return new ForbiddenException("Resource Forbidden");
        return await this.clientObject(user._id);
    }

    private async clientObject(_id:string) {
        const [ aggregatedUser ] = await this.userService.getAggregatedUser(_id);
        const data = { _id, email: aggregatedUser.email };
        const accessToken = await this.generateAccessToken(data, {});
        return Object.assign(aggregatedUser, { accessToken });
    }

    private async hashPassword(pass:string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(pass, salt);
    }
    private async generateAccessToken(data, options?: SignOptions) {
        return this.jwtService.sign(data, options);
    }

    private async validateUserPassword(
        password: string,
        hashedPassword: string,
      ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}