import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
/**
 * @class
 */
class AdminServices {
  /**
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {object} prisma - Prisma client instance
   */
  constructor() {
    this.prisma = prisma;
  }

  async createAdmin(username, email, password) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await this.prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return admin;
  }
}

export default AdminServices;
