import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll({
        where: {
            status: 1
        }
    });
    res.json({ users });
}; 

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    const user = await User.findByPk(id);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json(`Doesn't exist the user with the id ${id}`);
    }
};

export const createUser = async (req: Request, res: Response) => {
    
    try {

        const { body } = req;

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existEmail) {
            return res.status(400).json({
                msg: `Email address ${body.email} is already exist`
            });
        }

        const user = await User.create(body);
        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk with the backend developer'
        });
    }

}; 

export const updateUser = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            msg: `Doesn't exist the user with the id ${id}`
        });
    }

    await user.update(body);
    res.json(user);

}; 

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            msg: `Doesn't exist the user with the id ${id}`
        });
    }

    await user.update({
        status: 0
    });

    res.json(user);

}; 