import Cart from '../models/Cart.js';

async function getCart(req, res) {
    try {
        const carts = await Cart.find().populate("user").populate("videogames.videogame");
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
    }
};

async function getCartById(req, res) {
    try {
        const { cartId } = req.params;

        const cart = await Cart.findById(cartId)
            .populate('videogames.videogame')
            .populate('user');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
};

async function getCartByUser(req, res) {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId })
            .populate("videogames.videogame")
            .populate("user");

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
};

async function createCart(req, res) {
    try {
        const { userId } = req.params;
        const { videogames = [] } = req.body;

        const newCart = await Cart.create({
            user: userId,
            videogames
        });

        await newCart.populate("user");
        await newCart.populate("videogames.videogame");

        res.status(201).json(newCart);

    } catch (error) {
        console.log(error);
    }
};

async function addVideogamesToCart(req, res) {
    try {
        const { userId } = req.params;
        const { videogameId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                videogames: [{ videogame: videogameId, quantity }]
            });
        } else {
            const index = cart.videogames.findIndex(
                item => item.videogame.toString() === videogameId
            );

            if (index >= 0) {
                cart.videogames[index].quantity += quantity;
            } else {
                cart.videogames.push({ videogame: videogameId, quantity });
            }
        }

        await cart.save();
        await cart.populate("user");
        await cart.populate("videogames.videogame");

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
};

async function updateCart(req, res) {
    try {
        const { cartId } = req.params;
        const { videogames } = req.body;

        if (!videogames || !Array.isArray(videogames)) {
            return res.status(400).json({ message: "Se requiere un array de videojuegos" });
        }

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        videogames.forEach(({ videogame, quantity }) => {
            const index = cart.videogames.findIndex(
                item => item.videogame.toString() === videogame
            );

            if (index >= 0) {
                cart.videogames[index].quantity = quantity;
            } else {
                cart.videogames.push({ videogame, quantity });
            }
        });

        await cart.save();
        await cart.populate("user");
        await cart.populate("videogames.videogame");

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
};

async function deleteCart(req, res) {
    try {
        const { cartId } = req.params;
        const { videogameId } = req.body;

        if (!videogameId) {
            return res.status(400).json({ message: "videogameId es requerido" });
        }

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const initialLength = cart.videogames.length;

        cart.videogames = cart.videogames.filter(
            item => item.videogame.toString() !== videogameId
        );

        if (cart.videogames.length === initialLength) {
            return res.status(404).json({ message: "Videojuego no encontrado en el carrito" });
        }

        await cart.save();
        await cart.populate("user");
        await cart.populate("videogames.videogame");

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
}

export { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart};