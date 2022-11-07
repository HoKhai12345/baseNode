const { body } = require('express-validator')
const usersService = require('../../news/service/usersService')
module.exports = {
    store: [
        body('username', 'Không được để trống trường username').exists(),
        body('username', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('username').custom(username => {
            return usersService.findByUser(username).then(user => {
                if (user) {
                    return Promise.reject('username đã tồn tại');
                }
            });
        }),
        body('name', 'Không được để trống trường name').exists(),
    ],
    update: [
        body('status', 'Không được để trống status').exists()
    ]
}