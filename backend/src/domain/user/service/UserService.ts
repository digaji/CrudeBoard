import { compare, genSalt, hash } from "bcryptjs";
import { Board } from "../../board/entity/Board";
import { Column } from "../../board/entity/Column";
import { BoardService } from "../../board/service/BoardService";
import { ColumnService } from "../../board/service/ColumnService";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    static async addDefaultBoardToUser(userId: string) {
        const board = new Board();
        board.id = "default";
        await BoardService.createBoard(userId, board);
        const column = new Column();
        column.id = "column-1";
        await ColumnService.createColumn(userId, board.id, column);
        column.id = "column-2";
        await ColumnService.createColumn(userId, board.id, column);
        column.id = "column-3";
        await ColumnService.createColumn(userId, board.id, column);
    }

    static async hashUserPassword(user: User) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password!, salt);
        user.password = hashedPassword;
        return user;
    }

    static async createAdmin(user: User) {
        user.authorization = "admin";
        user = await this.hashUserPassword(user);
        const userId = await UserRepository.createUser(user);
        await this.addDefaultBoardToUser(userId);
        return userId;
    }

    static async createEmployee(user: User) {
        user.authorization = "employee";
        user = await this.hashUserPassword(user);
        const userId = await UserRepository.createUser(user);
        await this.addDefaultBoardToUser(userId);
        return userId;
    }

    static async userExistsByEmail(email: string) {
        try {
            const res = await UserRepository.findUserByEmail(email);
            return res.length > 0;
        } catch (err) {
            console.log(err);
            return true;
        }
    }

    static async removeUser(userId: string) {
        UserRepository.removeUser(userId);
    }

    static async validateUser(user: User) {
        const res = await UserRepository.findUserByEmail(user.email!);
        const actualUser = res[0];
        const validPass = await compare(user.password!, actualUser.password!);
        return validPass;
    }

    static async findUserByEmail(email: string) {
        return UserRepository.findUserByEmail(email);
    }
}