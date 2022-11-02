const { body } = require('express-validator')
const usersService = require('../../news/service/usersService')
module.exports = {
    store: [
        body('username', 'Không được để trống trường username').exists(),
        body('username', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('username').custom(username => {
            return usersService.findByUser(username).then(user => {
                console.log("USERRRRRRRRRRRRRRRRRRRRRRRRR" , user);
              if (user) {
                return Promise.reject('username đã tồn tại');
              }
            });
        }),
        body('name', 'Không được để trống trường name').exists(),
        // body('age', 'Trường tuổi phải là định dạng số').if((value, { req }) => {
        //     typeof value == 'number'
        //     console.log("AGE", typeof value);
        // })
        // ,
    ],
    update: [
        body('status', 'Không được để trống status').exists()
    ]
}