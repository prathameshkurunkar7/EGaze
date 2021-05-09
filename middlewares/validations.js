const {check,body} = require('express-validator');

exports.validationEvent = [
    body().custom(body => {
        const keys = ['name','description','organizer','attendees','date','start_time','end_time'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Some extra parameters are sent'),
    check('name').notEmpty().trim().withMessage('Name must not be empty'),
    check('description').notEmpty().trim().withMessage('Description must not be empty'),
    check('organizer').notEmpty().trim().withMessage('Organizer must not be empty'),
    check('date').custom(val=>{
        if (isNaN(Date.parse(val))) return false;
        else return true;
    }).withMessage('Entered Date is not valid'),
    check('start_time').custom(val=>{
        const reg = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
        if(String(val).match(reg)) return true;
        else return false;
    }).withMessage('Start Time is not valid'),
    check('end_time').custom(val=>{
        const reg = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
        if(String(val).match(reg)) return true;
        else return false;
    }).withMessage('End Time is not valid'),
    check('attendees').isInt({min:1}).withMessage('Not a valid attendee count'),  
]