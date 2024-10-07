import { Router } from 'express';
import { createPayGrade,getPayGrade,getPayGradeByID,updatePayGrade,deletePayGrade } from '../controllers/paygrade.controller';
const router = Router();

router.post('/',createPayGrade);
router.get('/',getPayGrade);
router.get('/:id',getPayGradeByID);
router.put('/:id',updatePayGrade);
router.delete('/:id',deletePayGrade);


export default router;
