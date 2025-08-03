import { Request, Response } from "express";
import RegistrationFormModel from "../models/RegistrationFormModel";
import * as formidable from "formidable";
import fs from "fs"
import path from "path"
import DoctorModel from "../models/DoctorModel";
import CryptoJS from "crypto-js"

export const getRegForms = async (req: Request, res: Response) => {
  try {
    const { doctor } = req.query
    let Registrations
    if(doctor) {
      Registrations = await RegistrationFormModel.find({ doctor }).populate("doctor").sort({ createdAt: -1 }) 
    } else {
      Registrations = await RegistrationFormModel.find().populate("doctor").sort({ createdAt: -1 })
    }
    res.status(200).json({ success: Registrations })
  } catch (err: any) {
    res.status(500).json({ err: err.message })
  }
}

export const updateRegForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const formData: any = {}; // Create an object to store form data
    let fileFieldPresent = false; // Flag to indicate if a file field is present

    const form = new formidable.IncomingForm()

    form.on('field', (fieldName: any, value: any) => {
      formData[fieldName] = value;
    });
    
    form.on("file", async (fieldName: any, file: any) => {
      formData[fieldName] = file;
      fileFieldPresent = true; // Set the flag to true
    });

    form.on("end", async () => {
      if (!fileFieldPresent) {
        formData.avatar = null
      }
      processForm()
    })

    const processForm = async () => {
      
      let { 
        doctor, 
        RegNo, fullName, yearOfBirth, placeOfBirth, sex, contact, nationality, medecinType, 
        inscriptionDate, avatar, password, speciality, cabinet,
        
        maritalStatus, conjoint, num_Child, educationalAchievements, militarySituation,
        practiceLocations, highSchoolAccomplishments, dentalSchoolInformation, dentalMedicineDegree, universityHospitalTitles,
        advancedQualifications, specialtyQualificationStatus, supplementaryUniversityCertifications, distinctionsAndHonoraryTitles, 
        otherUniversityDegrees,
        specialtyCertificateInProgress, specificDateInformation, modeOfExercise, salariedMedicalPractitioner, foreignDoctor,
        workInPublicSector, practiceInPrivateMedicine, privatePracticeAuthorization, workPracticeIn, remplacements,
        practiceHealthcareDiagnosis, siNon, activityMedicine, paramedical, otherActivities, association, interestInOrganizations, 
        contract, contractCommunicationCompliance, organizationsSeekingCollaboration, languages, refusedRegistration, 
        regOrderList, otherCountries, jurisdictionalPenalties, criminalCivilConvictions, judicialDisciplinaryActions
      } = formData

      
      conjoint = JSON.parse(conjoint)
      specificDateInformation = JSON.parse(specificDateInformation)
      dentalMedicineDegree = JSON.parse(dentalMedicineDegree)
      salariedMedicalPractitioner = JSON.parse(salariedMedicalPractitioner)
      foreignDoctor = JSON.parse(foreignDoctor)
      
      contact = JSON.parse(contact)
      nationality = JSON.parse(nationality)

      const formErrors: any = [];
      const checkDoctorPhoneExist = await DoctorModel.findOne({ _id: { $ne: doctor }, "$or": [
        {"contact.phone": contact.phone },
        {"contact.whatsapp": contact.whatsapp },
        {"contact.email": contact.email },
      ]})

      const doctorInfo: any = await DoctorModel.findOne({ _id: doctor })

      if(checkDoctorPhoneExist) {
        // formErrors.push("le contact du docteur existe deja");
      }

      if (!fullName || fullName.length === 0) {
        formErrors.push("Le Prenom est obligatoire");
      }
      if (!contact) {
        // formErrors.push("le contact est obligatoire");
      }
      if (!yearOfBirth) {
        formErrors.push("l'année de naissance est obligatoire");
      }
      if (!placeOfBirth) {
        formErrors.push("la place de naissance est obligatoire");
      }
      if (!nationality.current) {
        // formErrors.push("pays de résidence actuel est obligatoire");
      }
      if (!nationality.origin) {
        // formErrors.push("donner l'origine du docteur");
      }
      if (!inscriptionDate) {
        formErrors.push("donner une date d'inscription valide");
      }
      
      if (!password || password.length === 0) {
        password = doctorInfo?.password
      } else {
          let checkPass = CryptoJS.enc.Utf8.parse(password);
          password = CryptoJS.AES.encrypt(
              checkPass,
              process.env.PASS_SEC ?? ""
          ).toString()
      }

      if(formErrors.length === 0) {
        let doctorData: any
        if(cabinet && cabinet !== 'undefined') {
          doctorData = {
            RegNo, fullName, yearOfBirth, placeOfBirth, sex, contact, nationality, medecinType,
            inscriptionDate, password, speciality, cabinet
          }
        } else {
          doctorData = {
            RegNo, fullName, yearOfBirth, placeOfBirth, sex, contact, nationality, medecinType,
            inscriptionDate, password, speciality
          }
        }

        if(avatar?.filepath) {
          if(doctorInfo.avatar) {
            const filePath = path.join(__dirname, '../public/imgs/doctors/', doctorInfo.avatar);
            fs.unlink(filePath, () => null);
          }
          const newFileName = fullName + "-" + Date.now() + path.extname(avatar?.originalFilename ?? "")
          const newPath = path.join(__dirname, '../public/imgs/doctors/', newFileName);    
          doctorData.avatar = newFileName
          fs.copyFile(avatar.filepath, newPath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Failed to save the file' });
            }
            fs.unlink(avatar.filepath, (unlinkErr) => {
              if (unlinkErr) {
                console.error(unlinkErr);
              }
            });
          })      
        } else {
          doctorData.avatar = doctorInfo.avatar
        }
        
        await DoctorModel.updateOne({_id: doctor }, doctorData, { new: true })
  
        await RegistrationFormModel.updateOne({ _id: id }, { 
          maritalStatus, conjoint, num_Child, educationalAchievements, militarySituation,
          practiceLocations, highSchoolAccomplishments, dentalSchoolInformation, dentalMedicineDegree, universityHospitalTitles,
          advancedQualifications, specialtyQualificationStatus, supplementaryUniversityCertifications, distinctionsAndHonoraryTitles, 
          otherUniversityDegrees, 
          specialtyCertificateInProgress, specificDateInformation, modeOfExercise, salariedMedicalPractitioner, foreignDoctor,
          workInPublicSector, practiceInPrivateMedicine, privatePracticeAuthorization, workPracticeIn, remplacements,
          practiceHealthcareDiagnosis, siNon, activityMedicine, paramedical, otherActivities, association, interestInOrganizations, 
          contract, contractCommunicationCompliance, organizationsSeekingCollaboration, languages, refusedRegistration, 
          regOrderList, otherCountries, jurisdictionalPenalties, criminalCivilConvictions, judicialDisciplinaryActions
        }, { new: true })
        await getRegForms(req, res)
      } else {
        res.status(300).json({ formErrors })
      }
    }

    form.parse(req);
  } catch(err: any) {
    console.log("err: ", err)
    res.status(500).json({ err: err.message })
  }
}
