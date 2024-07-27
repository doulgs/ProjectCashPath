import prismaClient from "../../prisma/index";
import {} from "../../types/databaseTypes";

type ExecuteProps = {
  company_id: number;
};

class DetailCompanyService {
  async execute({ company_id }: ExecuteProps) {
    const company = await prismaClient.company.findFirst({
      where: { id: company_id },
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

export { DetailCompanyService };
