exports.validateEmployeeInput = (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Le prénom, le nom et l\'email de l\'employé sont requis.' });
    }
    // Vous pouvez ajouter d'autres validations ici (format de l'email, etc.)
    next();
  };