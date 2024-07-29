import { Email } from "src/models/email.model";

// Define the points for each boolean field
const booleanFieldPointsToManager = {
    safe: 1,
    keys: 9,
    envelopes: 5,
    cash: 4,
    folder: 8,
    envelopesInDay: 7,
    cameras: 1,
    register: 5,
    redemption: 5,
    cashCancellation: 5,
    unusualAmounts: 5,
    clubMember: 5,
    smallRegister: 5,
    unloadedDocuments: 7,
    otherDocuments: 6,
    warehouseStock: 7,
    employeeAttendance: 0,
    buzzerDetector :5,
  buzzersInItems :5,
  warehouseDoor :5,
};

const booleanFieldPointsToZacyan = {
    safe: 1,
    keys: 9,
    envelopes: 5,
    cash: 4,
    folder: 8,
    envelopesInDay: 7,
    cameras: 1,
    register: 7,
    redemption: 7,
    cashCancellation: 6,
    unusualAmounts: 5,
    clubMember: 5,
    smallRegister: 0,
    unloadedDocuments: 7,
    otherDocuments: 6,
    warehouseStock: 7,
    employeeAttendance: 0,
    buzzerDetector :5,
  buzzersInItems :5,
  warehouseDoor :5,
  };

export const getGrade = (email: Email) => {
  let grade = 0;

  if(email.managerOption==='מנהל'){
  for (const key in booleanFieldPointsToManager) {
    if (email[key] === true) {
      grade += booleanFieldPointsToManager[key];
    }
  }
}else{
    for (const key in booleanFieldPointsToZacyan) {
        if (email[key] === true) {
          grade += booleanFieldPointsToZacyan[key];
        }
      }
}

  return grade;
};