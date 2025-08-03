import mongoose from "mongoose";
import DoctorModel from "./models/DoctorModel";
import dotenv from "dotenv";
import { dataDoctorsONMDM } from "./converted-onmdm";
import RegistrationFormModel from "./models/RegistrationFormModel";
import PaymentModel from "./models/PaymentModel";

dotenv.config();

// Start database connection
mongoose.connect(process.env.MONGO_URL ?? "");
mongoose.connection.once('connected', () => {
  console.log("db connected successfully");
});


const uploadData = async () => {
  try {
    const doctors = await DoctorModel.find();
    // console.log("doctors: ", doctors);
    // console.log("dataDoctorsONMDM: ", dataDoctorsONMDM)
    // console.log(dataDoctorsONMDM
    //     .sort((a, b) => Number(a["N°"].split("/")[0]) - Number(b["N°"].split("/")[0]))
    // )

    dataDoctorsONMDM
    .sort((a, b) => Number(a["N°"]) - Number(b["N°"]))
    .forEach(async (doctor) => {
        // console.log()
        const newDoctor = await DoctorModel.create({ 
            RegNo: doctor["N°"],
            fullName: doctor.Prénoms + " " + doctor["Noms "],
            password: "U2FsdGVkX1+NB2tE/LZGUo3vC5nnl2x7yXVOM98hZAg=",
            yearOfBirth: doctor["Date/Naiss"],
            placeOfBirth: doctor["Lieu/ Naiss"] ?? "",
            sex: "masculin",
            contact: {
                phone: doctor.Télèphone,
                whatsapp: doctor.Télèphone,
                email: "",
            },
            medecinType: new mongoose.Types.ObjectId("6577274dd379d054f6f6c260"),
            inscriptionDate: doctor["Date/d'inscription"] + "-12-31T16:43:52.772+00:00",
            // inscriptionDate: new Date(doctor["Date/d'inscription"]).getFullYear(),
         })
        await RegistrationFormModel.create({ doctor: newDoctor._id })
        await PaymentModel.create({ doctor: newDoctor._id, amount: 2000, type: "inscription" })
        await PaymentModel.create({ doctor: newDoctor._id, amount: 2000, type: "abonnement", subscriptionYear: doctor["Date/d'inscription"] })        
        
        await newDoctor.save()
    });
    console.log("Done ...");

  } catch (err) {
    console.log("err: ", err);
  }
};

uploadData();
