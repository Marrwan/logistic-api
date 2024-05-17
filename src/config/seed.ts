
import { Package } from '../models/package.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { PackageService } from '../services/package.service';
import { hashToken } from '../utils/tokens.utils';
import sequelize from './db';

let authService = new AuthService();
let packageService = new PackageService()
sequelize.sync()
const seedUsers = async () => {
    let password = await hashToken("Qwerty12345#")
  const users = [
    {
      username: 'Aisha',
      email: 'abdulbasit.doe@example.com',
      password: password, 
    },
    {
      username: 'Afnaan',
      email: 'nurayn.doe@example.com',
      password: password, 
    },

  ];

  await users.forEach(async(user)=>{
    await authService.createUser(user)
  })
  console.log('Users seeded successfully');
};

const seedPackages = async () => {
  const users = await User.findAll(); // Retrieve all created users

  const packages = [
    {
      name: 'Package 1',
      status: 'Received',
      pickupDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
      userId: users[0].id, 
    },
    {
      name: 'Package 2',
      status: 'In Transit',
      pickupDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
      userId: users[1].id, 
    },
    {
      name: 'Package 3 ',
      status: 'Pending', 
      pickupDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
      userId: users[Math.floor(Math.random() * users.length)].id, 
    },
    {
      name: 'Package 4 ',
      status: 'Pending', 
      pickupDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
      userId: users[1].id, 
    },
  ];
  await packages.forEach(async(thePackage)=>{
    await packageService.createPackage(thePackage)
  })
//   await Package.bulkCreate(packages);
  console.log('Packages seeded successfully');
};

const runSeeds = async () => {
  try {

    await seedUsers();
    await seedPackages();
    process.exit(0); // Exit process after seeding
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit process with error code on failure
  }
};

runSeeds();
