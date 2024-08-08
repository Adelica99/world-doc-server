import { PrismaService } from 'src/prisma.service';

export class ModelUtil {
    constructor(private readonly prisma: PrismaService) { }

    async checkModelExists(model: string, id: string): Promise<boolean> {
        switch (model) {
            case "doctor":
                const doctor = await this.prisma.doctor.findUnique({
                    where: { id },
                });

                return !!doctor

            case "serve":
                const serve = await this.prisma.serve.findUnique({
                    where: { id },
                });

                return !!serve

            case "disease":
                const disease = await this.prisma.disease.findUnique({
                    where: { id },
                });

                return !!disease

        }
    }

}