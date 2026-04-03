import Cart from '../models/Cart.js';

async function getCart(req, res) {
    try {
        const cart = await Cart.findById(req.params.id);
        res.json(cart);

    } catch (error) {
        console.log(error);
    }
};

async function getCartById(req, res) {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id).populate('videogames.videogame').populate('user');

        if(!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        };

        res.status(200).json(cart);

    } catch (error) {
console.log(error);
    };
};

async function getCartByUser(req, res) {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: userId }).populate("videogames.videogame").populate("user");

        if ( !cart ) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        };

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
    
};

async function createCart(req, res) {
    try {
        const { user, videogames } = req.body;

        if (!user || !videogames) {
            return res.status(400).json({ message: "Los campos usuario y videojuegos son requeridos" });
        };

        for (let i = 0; i < videogames.length; i++) {
            if (!videogames[i].videogame || !videogames[i].quantity) {
                return res.status(400).json({ message: "Cada videojuego debe tener un id y una cantidad" });
            };
        };

        const newCart = await Cart.create({ user, videogames });

        await newCart.populate("user");
        await newCart.populate("videogames.videogame");

        res.status(200).json(newCart);

    } catch (error) {
        console.log(error);
    }
};

async function updateCart(req, res) {
    try {
        const { id } = req.params;
        const { user, videogames } = req.body;

        if (!user || !videogames) {
            return res.status(400).json({ message: "Los campos usuario y videojuegos son requeridos" });
        }

        for (let i = 0; i < videogames.length; i++) {
            if (!videogames[i].videogame || !videogames[i].quantity) {
                return res.status(400).json({ message: "Cada videojuego debe tener un id y una cantidad" });
            };
        };

        const updatedCart = await Cart.findByIdAndUpdate(id, { user, videogames }, { new: true }).populate("user").populate("videogames.videogame");

        if (updatedCart) {
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }

    } catch (error) {
        console.log(error);
    }
};

async function deleteCart(req, res) {
    try {
        const { id } =req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (deletedCart) {
            res.status(200).json({ message: "Carrito Eliminado con exito"})
        } else {
            res.status(404).json({ message: "Carrito no encontrado"})
        };

    } catch (error) {
        console.log(error);
    }
    
};

async function addVideogamesToCart(req, res) {
    try {
        const { userId, videogameId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if(!cart) {
            cart = await Cart.create({ user: userId, videogames: [{ videogame: videogameId, quantity }] });
        } else {
            const existingVideogameIndex = cart.videogames.findIndex((index) => index.videogame.tostring() === videogameId);

            if (existingVideogameIndex >= 0) {
                cart.videogames[existingVideogameIndex].quantity += quantity;
            } else {
                cart.videogames.push({ videogame: videogameId, quantity });
            }
        };

        await cart.save();
        await cart.populate("user");
        await cart.populate("videogames.videogame");

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    };
};

export { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart };