import prismaClient from "../../prisma/index";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { CompanyType } from "../../types/databaseTypes";

type Company = Pick<CompanyType, "email" | "password">;

class AuthCompanyService {
  async execute({ email, password }: Company) {
    const company = await prismaClient.company.findFirst({
      where: {
        email,
      },
    });

    if (!company) {
      throw new Error("Informações para login incorretas");
    }

    const isPasswordValid = await compare(password, company.password);

    if (!isPasswordValid) {
      throw new Error("Informações para login incorretas");
    }

    const token = sign(
      {
        company: company.name,
        email: company.email,
        taxId: company.taxId,
      },
      process.env.JWT_SECRET,
      {
        subject: company.id.toString(),
        expiresIn: "30d",
      }
    );

    return {
      id: company.id,
      name: company.name,
      email: company.email,
      token,
    };
  }
}

export { AuthCompanyService };
