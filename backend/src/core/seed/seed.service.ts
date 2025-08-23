/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { Product, ProductDocument } from '../../features/products/schemas/product.schema';

import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async seedProducts() {

        // Controlla se ci sono già prodotti nel database
        const existingProductsCount = await this.productModel.countDocuments();

        if (existingProductsCount > 0) {
            this.logger.log(`Database already has ${existingProductsCount} products. Skipping seed.`);
            return { message: 'Products already exist', count: existingProductsCount };
        }

        const products: Product[] = [
            // FRUTTA
            {
                name: "Mele Golden",
                cost: 2.50,
                image: "https://unesretailprod.blob.core.windows.net/retail/FRESCHI/ORTOFRUTTA/57953/621D8768-D52E-4751-A0AE-294D5A5F6196_U1_BIG.Jpg",
                type: "fruit"
            },
            {
                name: "Banane",
                cost: 1.80,
                image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                type: "fruit"
            },
            {
                name: "Arance",
                cost: 2.20,
                image: "https://www.cure-naturali.it/.imaging/default/dam/cure-naturali/enciclopedia-naturale/alimentazione/arance.jpg/jcr:content.jpg",
                type: "fruit"
            },
            {
                name: "Fragole",
                cost: 4.50,
                image: "https://www.fruttanellescuole.gov.it/flex/images/1/c/e/D.25ff10dc35f33b84c8d6/fragola__1_.jpg",
                type: "fruit"
            },
            {
                name: "Limoni",
                cost: 2.80,
                image: "https://www.fruttanellescuole.gov.it/flex/images/1/3/5/D.9aa67908eebc48dee966/shutterstock_289188959.jpg",
                type: "fruit"
            },
            {
                name: "Kiwi",
                cost: 3.20,
                image: "https://www.fruttanellescuole.gov.it/flex/images/1/c/d/D.eb83c49bff4baf9ca678/kiwi.jpg",
                type: "fruit"
            },
            {
                name: "Pesche",
                cost: 3.80,
                image: "https://www.muller.it/fileadmin/editorials/iStock-824163462.jpg",
                type: "fruit"
            },
            {
                name: "Uva Bianca",
                cost: 4.20,
                image: "https://mangialocale.com/wp-content/uploads/2023/06/aa-cooperativa-la-torre-uva-bianca-vittoria.jpg",
                type: "fruit"
            },

            // VERDURA
            {
                name: "Pomodori Ciliegino",
                cost: 3.50,
                image: "https://www.aziendascollosebastiana.it/wp-content/uploads/2021/04/pomodoro-ciliegino-siciliano-1.jpg",
                type: "vegetable"
            },
            {
                name: "Lattuga",
                cost: 1.50,
                image: "https://foodoteka.com/img/fill/720/400/no/1/plain/local:///public/blog/lattuga-romana-biologica-foodoteka.jpg",
                type: "vegetable"
            },
            {
                name: "Carote",
                cost: 1.80,
                image: "https://www.fruttanellescuole.gov.it/flex/images/1/7/f/D.145e005be7ba86f7b02b/carota__1_.jpg",
                type: "vegetable"
            },
            {
                name: "Zucchine",
                cost: 2.30,
                image: "https://www.parmalat.it/origin0/app/uploads/2021/10/22111018/come-cucinare-le-zucchine-b.png",
                type: "vegetable"
            },
            {
                name: "Melanzane",
                cost: 2.80,
                image: "https://bottegalemacine.com/wp-content/uploads/2024/07/Melanzane.jpeg.webp",
                type: "vegetable"
            },
            {
                name: "Peperoni Rossi",
                cost: 3.20,
                image: "https://www.ricette.com/wp-content/uploads/2013/10/peperoni.jpg",
                type: "vegetable"
            },
            {
                name: "Cipolla Dorata",
                cost: 1.20,
                image: "https://www.myfruitbox.it/wp-content/uploads/2020/04/110534706.jpg",
                type: "vegetable"
            },
            {
                name: "Broccoli",
                cost: 2.50,
                image: "https://www.nutridoc.it/api/articles/00000000268/broccoli.jpg",
                type: "vegetable"
            },
            {
                name: "Spinaci Freschi",
                cost: 2.20,
                image: "https://www.misya.info/wp-content/uploads/2016/04/pulire-spinaci.jpg",
                type: "vegetable"
            },

            // ERBE AROMATICHE
            {
                name: "Basilico Fresco",
                cost: 1.50,
                image: "https://www.diet-health.info/images/recipes/700/basilikum-by-billion-photos-shutterstock-554601856.jpg",
                type: "herbs"
            },
            {
                name: "Rosmarino",
                cost: 1.80,
                image: "https://www.lasaponaria.it/img/cms/rosmarino1.jpg",
                type: "herbs"
            },
            {
                name: "Prezzemolo",
                cost: 1.20,
                image: "https://galleria.riza.it/files/article/prezzemolo-l-erba-aromatica-ricca-di-vitamine-che-favorisce-la-digestione.jpg",
                type: "herbs"
            }
        ];

        /*   const products: Product[] = [
              {
                  name: "Quaderno A4 Righe",
                  cost: 3.50,
                  image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "paper"
              },
              {
                  name: "Penna Blu Bic Cristal",
                  cost: 1.20,
                  image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "plastic"
              },
              {
                  name: "Matita HB Staedtler",
                  cost: 0.80,
                  image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "wood"
              },
              {
                  name: "Evidenziatore Giallo Stabilo",
                  cost: 2.10,
                  image: "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1000",
                  type: "plastic"
              },
              {
                  name: "Blocchetti Post-it Colorati",
                  cost: 4.50,
                  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "paper"
              },
              {
                  name: "Righello 30cm Trasparente",
                  cost: 1.50,
                  image: "https://images.pexels.com/photos/6191/creative-desk-pens-school.jpg?auto=compress&cs=tinysrgb&w=1000",
                  type: "plastic"
              },
              {
                  name: "Gomma Bianca Pelikan",
                  cost: 1.00,
                  image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "plastic"
              },
              {
                  name: "Quaderno A5 Quadretti",
                  cost: 2.80,
                  image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "paper"
              },
              {
                  name: "Temperamatite Doppio Foro",
                  cost: 1.80,
                  image: "https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=1000",
                  type: "plastic"
              },
              {
                  name: "Astuccio Portapenne",
                  cost: 6.50,
                  image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  type: "plastic"
              }
          ];
   */
        try {
            const insertedProducts = await this.productModel.insertMany(products);
            this.logger.log(`Successfully seeded ${insertedProducts.length} products`);
            return {
                message: 'Products seeded successfully',
                count: insertedProducts.length,
                products: insertedProducts
            };
        } catch (error) {
            this.logger.error('Error seeding products:', error);
            throw error;
        }
    }

    async seedUsers() {

        // Controlla se ci sono già utenti nel database
        const existingUsersCount = await this.userModel.countDocuments();

        if (existingUsersCount > 0) {
            this.logger.log(`Database already has ${existingUsersCount} users. Skipping seed.`);
            return { message: 'Users already exist', count: existingUsersCount };
        }

        try {
            const hashedAdminPassword = await bcrypt.hash('adminPG', 10);
            const hashedDemoPassword = await bcrypt.hash('demo', 10);

            const users = [
                {
                    username: 'admin',
                    password: hashedAdminPassword,
                    displayName: 'Paolo Gatto',
                    role: 'admin'
                },
                {
                    username: 'demo',
                    password: hashedDemoPassword,
                    displayName: 'Demo User',
                    role: 'user'
                }
            ];

            await this.userModel.insertMany(users);
            this.logger.log('Users created successfully: admin/adminPG <==> demo/demo !!!');
            return {
                message: 'Users created successfully!!!',
                count: 2,
                users: ['admin', 'demo'],
                displayNames: ['Paolo Gatto', 'Demo User']
            };
        } catch (error) {
            this.logger.error('Error creating users !!!:', error);
            throw error;
        }

    }
}