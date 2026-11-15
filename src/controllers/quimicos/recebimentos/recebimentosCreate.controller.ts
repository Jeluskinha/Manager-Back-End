import { Request, Response } from "express";
import recebimentosCreateService from "../../../services/quimicos/recebimentos/recebimentosCreate.service";
import { AppError, handleError } from "../../../errors/appError";

const recebimentosCreateController = async (req: Request, res: Response) => {
  try {

      const request = req.body;
      const newRecebimento = await recebimentosCreateService(request);
      return res.status(201).send(newRecebimento);

  } catch (error) {

    if(error instanceof AppError){// se existir erro nos dados o SERVICE retornará pelo AppError

            handleError(error, res)
            
      } else { // se o erro for nos campos  ['produto','peso_bruto','peso_liquido', 'pallet', 'recebido_por, 'atualizado_por', 'recipiente', 'fornecedor']

        return res.status(400).json({ 
                error: 'dados inválidos',
                message: 'Verifique os campos enviados.', 
                details: {
                  expected_schema: {  // Esquema esperado 
                    "produto": "string",
                    "peso_bruto": "integer",
                    "peso_liquido": "integer",
                    "pallet": "integer",
                    "recebido_por": "string",
                    "atualizado_por": "string",
                    "recipiente": "string*obs*",
                    "fornecedor": "string*obs*"
                    }
                }
              });
      }
  }


};

export default recebimentosCreateController;
