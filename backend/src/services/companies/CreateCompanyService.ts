import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";
import { CompanyType } from "../../types/databaseTypes";

type Company = Pick<CompanyType, "name" | "taxId" | "email" | "password">;

class CreateCompanyService {
  async execute({ name, taxId, email, password }: Company) {
    if (!name || !taxId || !email || !password) {
      throw new Error("Preencha todos os campos");
    }

    const companyExists = await prismaClient.company.findFirst({
      where: {
        OR: [{ taxId }, { email }],
      },
    });

    if (companyExists) {
      throw new Error("Empresa já cadastrada");
    }

    const hashedPassword = await hash(password, 8);

    const company = await prismaClient.company.create({
      data: {
        name,
        taxId,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        taxId: true,
        email: true,
        createdAt: true,
      },
    });

    return company;
  }
}

export { CreateCompanyService };
