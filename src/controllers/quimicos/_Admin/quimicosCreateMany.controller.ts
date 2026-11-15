import { Request, Response } from "express";
import AdminQuimicoCreateAllService from "../../../services/quimicos/_Admin/quimicosCreateMany.service";
import { AppError, handleError } from "../../../errors/appError";

const AdminQuimicosCreateAllController = async (req: Request, res: Response) => { // cadastra todos os quimicos e cria o estoque ao mesmo tempo
  try {
    
      const lista = req.body;
      const newQuimico = await AdminQuimicoCreateAllService(lista);
      return res.status(201).send(newQuimico);

  } catch (error) {
    if(error instanceof AppError){// se existir erro nos dados o SERVICE retornará pelo AppError
           
        handleError(error, res)  

      } else { // se o erro for na estrutura de Array(Object) [{'produto','codigo'}, {'produto','codigo'},...] 
        // não fiz tratativa nas chaves {'produto','codigo'}, apenas na estrutura. Não farei pois esta rota é apenas para teste de desenvolvimento
       
        return res.status(400).json({ 
                error: 'dados inválidos',
                message: 'Verifique os campos enviados.', 
                details: {
                  expected_schema:[
                      {  
                        "produto": "string",
                        "codigo": "string"
                      },
                      {  
                        "produto": "string",
                        "codigo": "string"
                      },
                      "..."
                      ],
                  exemple:'[{objeto},{objeto},...]'
                },
                note: 'esta rota cria vários químicos de uma só vez, basta inserir vários {produto, codigo} dentro de um []',
              });
              
      }
  }

};

export default AdminQuimicosCreateAllController;
