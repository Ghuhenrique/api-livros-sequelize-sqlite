import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const anoAtual = new Date().getFullYear();

const Livro = sequelize.define(
  "Livro",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O título é obrigatório"
        },
        notEmpty: {
          msg: "O título não pode ser vazio"
        },
        len: {
          args: [2, 255],
          msg: "O título deve ter no mínimo 2 caracteres"
        }
      }
    },

    autor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O autor é obrigatório"
        },
        notEmpty: {
          msg: "O autor não pode ser vazio"
        },
        len: {
          args: [2, 255],
          msg: "O autor deve ter no mínimo 2 caracteres"
        }
      }
    },

    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O ano é obrigatório"
        },
        isInt: {
          msg: "O ano deve ser um número inteiro"
        },
        min: {
          args: 1450,
          msg: "O ano deve ser maior ou igual a 1450"
        },
        max: {
          args: anoAtual,
          msg: `O ano deve ser menor ou igual a ${anoAtual}`
        }
      }
    },

    paginas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O número de páginas é obrigatório"
        },
        isInt: {
          msg: "O número de páginas deve ser inteiro"
        },
        min: {
          args: 1,
          msg: "O livro deve ter pelo menos 1 página"
        }
      }
    }
  },
  {
    timestamps: true
  }
);

export default Livro;