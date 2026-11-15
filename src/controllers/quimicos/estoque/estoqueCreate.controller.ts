import { Request, Response } from "express";
import estoqueCreateService from "../../../services/quimicos/estoque/estoqueCreate.service";
import { AppError, handleError } from "../../../errors/appError";

const estoquesCreateController = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    return
    const { produto, codigo } = req.body;
    // const newEstoque = await estoqueCreateService({ produto, codigo});
    // return res.status(201).send(newEstoque);

  } catch (error) {
  
     if(error instanceof AppError){// se existir erro nos dados o SERVICE retornará pelo AppError
            
      handleError(error, res)

      } else { // se o erro for nos campos ['produto','codigo']

        return res.status(400).json({ 
                error: 'dados inválidos',
                message: 'Verifique os campos enviados.', 
                details: {
                  expected_schema: {  // Esquema esperado 
                    "produto": "string",
                    "codigo": "string"
                    }
                }
              });
              
      }
  }
};

export default estoquesCreateController;
