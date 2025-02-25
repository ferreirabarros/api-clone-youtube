"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const uuid_1 = require("uuid");
const mysql_1 = require("../../../mysql");
class UserRepository {
    create(request, response) {
        const { name, email, password } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            (0, bcryptjs_1.hash)(password, 10, (err, hash) => {
                if (err) {
                    return response.status(500).json(err);
                }
                connection.query('INSERT INTO  users (user_id, name, email, password) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), name, email, hash], (error, result, fileds) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error);
                    }
                    response.status(200).json({ massege: 'Usuario criado com sucesso' });
                });
            });
        });
    }
    login(request, response) {
        const { email, password } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM users WHERE  email = ?', [email], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro na sua autenticação" });
                }
                if (results.length === 0) {
                    return response.status(400).json({ error: "Usuario não encontrado" });
                }
                (0, bcryptjs_1.compare)(password, results[0].password, (err, result) => {
                    if (err) {
                        console.log("Erro ao comparar senha:", err);
                        return response.status(400).json({ error: "Erro na sua autenticação" });
                    }
                    if (!result) {
                        console.log("Senha incorreta para o email:", email);
                        return response.status(400).json({ error: "Senha incorreta" });
                    }
                    const token = (0, jsonwebtoken_1.sign)({ id: results[0].user_id, email: results[0].email }, process.env.SECRET, { expiresIn: "1d" });
                    console.log("Usuário autenticado:", email);
                    return response.status(200).json({ token: token, message: "Autenticado com sucesso" });
                });
            });
        });
    }
    getUser(request, response) {
        const decode = (0, jsonwebtoken_1.verify)(request.headers.authorization, process.env.SECRET);
        if (decode.email) {
            mysql_1.pool.getConnection((error, conn) => {
                conn.query('SELECT * FROM users WHERE email=?', [decode.email], (error, resultado, fields) => {
                    conn.release();
                    if (error) {
                        return response.status(400).send({
                            error: error,
                            response: null
                        });
                    }
                    return response.status(201).send({
                        user: {
                            nome: resultado[0].name,
                            email: resultado[0].email,
                            id: resultado[0].user_id
                        }
                    });
                });
            });
        }
    }
}
exports.UserRepository = UserRepository;
