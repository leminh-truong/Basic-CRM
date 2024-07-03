const Customer = require("../models/customer");
const Lists = require("../models/lists")
const Administrator = require("../models/administrator")

const customerController = require("../controllers/customerController");

const mongoose = require("mongoose");

describe("Unit testing: Test backend functions of customer controllers ", () => {

    const req = {
        params: {
            _id: "6168f961517e4e37f7ace879",
            email: "brandon@gmail.com",
            admin: "Haodong GU",
            phone_number: "1238"}
    };

    const res = {
        send: jest.fn()
    };

    beforeAll(() => {
        res.send.mockClear();
    })

    test("Test 1: Get one customer", () => {
        async () => {
            customerController.getCustomerByAdmin(req, res)
            .then(res => {
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res).toContainEqual({
                _id: "6168f961517e4e37f7ace879",
                first_name : "Bran",
                last_name : "B",
            }
            );
        })
    }})

    test("Test 2: Get customer by admin", () => {
        async () => {
            customerController.getCustomerByAdmin(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res).toContainEqual({
                _id: "6168f961517e4e37f7ace879",
                first_name : "Bran",
                last_name : "B",}
                );
            })
        }
    })

    test("Test 3: Get customer by email", () => {
        async () => {
            customerController.getCustomerByEmail(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res).toContainEqual({
                _id: "6168f961517e4e37f7ace879",
                first_name : "Bran",
                last_name : "B",}
                );
            })
        }
    })

    test("Test 4: Test assign admin to customer", () => {
        async () => {
            customerController.assignAdmin(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(200);
            }
            )       
        }
    })

    test("Test 5: Test update page visits count", () => {
        async () => {
            customerController.updateVisCount(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(200);
            }
            )       
        }
    })
    
    test("Test 6: Test delete one customer", () => {
        async () => {
            customerController.deleteOneCustomer(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(200);
            }
            )       
        }
    })

    test("Test 7: Test update customer details", () => {
        async () => {
            customerController.updateCustomerDetails(req, res)
            .then(res => {
            console.log(res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(200);
            }
            )       
        }
    })
})