import DoctorModel from "./models/DoctorModel";
import RegistrationFormModel from "./models/RegistrationFormModel";

const mongoose = require('mongoose');

const dbName = "onmdm"
// MongoDB connection string
const mongoURI = `mongodb+srv://sniper:1212@cluster0.p4xc21i.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// const mongoURI = `mongodb://127.0.0.1/${dbName}`;

// Output directory for backups
// const backupDir = `mongodb+srv://sniper:1212@cluster0.p4xc21i.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Wait for the Mongoose connection to be established
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');


  // Export all collections
  async function exportCollections() {
    const doctors = await DoctorModel.find()
    const regForms = await RegistrationFormModel.find()
    console.log("regForms: ", regForms.length)
    // console.log("doctors: ", doctors)
    for (const regForm of regForms) {
      try {
        const check = await doctors.find((doctor: any) => doctor._id?.equals(regForm.doctor))
        if(!check) {
          await RegistrationFormModel.deleteMany({ doctor: regForm.doctor  })
        }
        console.log("check: ", check)
        // console.log("doctor: ", regForm.doctor?.toString())
      } catch (error: any) {
        console.error(`Error ${error.message}`);
      } finally {
        const regForms = await RegistrationFormModel.find()
        console.log("regForms: ", regForms.length)    
      }
    }

    console.log('All collections exported successfully.');
  }

  // Run the exportCollections function
  exportCollections();
});

mongoose.connection.on('error', (err: any) => {
  console.error('Error connecting to MongoDB:', err.message);
});
