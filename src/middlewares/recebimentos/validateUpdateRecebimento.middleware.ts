import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";

// Campos que o PATCH /quimicos/recebimentos/:id aceita (todos opcionais: o que for omitido mantém o valor).
// Os nomes são os mesmos do POST.
const CAMPOS_TEXTO = ["produto", "tipo_recipiente", "fornecedor", "atualizado_por"];
const CAMPOS_NUMERICOS = ["peso_bruto", "peso_liquido", "quantidade_recipiente", "quantidade_pallet"];
// aceito no body (é comum reaproveitar o body do POST), mas ignorado: só é gravado na criação
const CAMPOS_IGNORADOS = ["recebido_por"];

const expected_schema = {
  produto: "string",
  peso_bruto: "number",
  peso_liquido: "integer >= 0",
  tipo_recipiente: "string",
  quantidade_recipiente: "number",
  quantidade_pallet: "number",
  fornecedor: "string",
  atualizado_por: "string",
};

export const validaUpdateRecebimentoJSON = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body ?? {};
  const validos = [...CAMPOS_TEXTO, ...CAMPOS_NUMERICOS];

  const invalidKeys = Object.keys(body).filter(
    (chave) => !validos.includes(chave) && !CAMPOS_IGNORADOS.includes(chave)
  );

  if (invalidKeys.length > 0) {
    throw new AppError("Chaves inválidas", 400, { invalidKeys, expected_schema });
  }

  if (!Object.keys(body).some((chave) => validos.includes(chave))) {
    throw new AppError("Nenhum campo para atualizar foi enviado", 400, { expected_schema });
  }

  const tipoInvalido = [
    ...CAMPOS_TEXTO.filter((c) => c in body && typeof body[c] !== "string"),
    ...CAMPOS_NUMERICOS.filter(
      (c) =>
        c in body &&
        (body[c] === null || (typeof body[c] === "string" && body[c].trim() === "") || !Number.isFinite(Number(body[c])))
    ),
  ];

  if (tipoInvalido.length > 0) {
    throw new AppError("Verifique os campos enviados.", 400, { invalidTypes: tipoInvalido, expected_schema });
  }

  next();
};
