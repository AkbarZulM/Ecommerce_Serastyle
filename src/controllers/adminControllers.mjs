import AdminServices from "../services/adminServiec.mjs";
import { registerSchema } from "../validations/adminValidation.mjs";
import { validate } from "../middlewares/validation.mjs";

/**
 * @class
 */
class AdminController {
  /**
   * @param {object} req
   * @param {object} res
   */
  constructor() {
    this.adminServices = new AdminServices();
    this.createAdmin = this.createAdmin.bind(this);
  }
  // Middleware validate
  validateRegister = validate(registerSchema);

  async createAdmin(req, res) {
    const { username, email, password } = req.body;
    try {
      const admin = await this.adminServices.createAdmin(
        username,
        email,
        password
      );
      // Hapus password dari response
      const { password: _, ...adminWithoutPassword } = admin;
      return res.status(201).json({
        status: "success",
        data: adminWithoutPassword,
      });
    } catch (error) {
      if (error.message.includes("already exists")) {
        return res.status(409).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default AdminController;
