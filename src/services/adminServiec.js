import prisma from "../config/prisma.js";

/**
 * @class
 */
class AdminServices {
  /**
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  constructor(prisma) {
    this.prisma = prisma;
  }
}

export default AdminServices;
