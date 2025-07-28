"use strict";
// src/middleware/validate.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next(); // ✅ Input is valid
        }
        catch (error) {
            res.status(400).json({
                message: "Validation failed",
                errors: error.errors || "Invalid request",
            });
            return;
        }
    };
};
exports.validate = validate;
