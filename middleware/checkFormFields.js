module.exports = ( req, res, next ) => {

    const fields = Object.keys( req.body );

    if ( !fields ) return res.status(400).json({
        status: 400,
        message: 'Please complete all fields',
    });

    for ( let idx = 0; idx < fields.length; idx++ ) {

        const field = fields[idx];

        if ( req.body[field] === '' ) return res.status(400).json({
            status: 400,
            fields: req.body,
            message: 'Please complete all fields',
        });
        
    };

    next();
};