"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const autentication = (req, res, next) => {
    try {
        const decode = (0, jsonwebtoken_1.verify)(req.headers.authorization, process.env.SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
};
exports.autentication = autentication;
