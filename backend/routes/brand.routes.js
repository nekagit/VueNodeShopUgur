const router = require('express').Router();
const { User, Brand, BrandMedia} = require('../db/models');
const { generateApiKey } = require('generate-api-key');

router.get('/user/:userId', async (req, res) => {
    try{
        const userBrands = await Brand.find({user_id: req.params.userId});
        res.status(200).json(userBrands);
    }catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
})

router.get('/:brandId/user/:userId', async (req, res) => {
    try {
        const userBrands = await Brand.findOne({
            user_id: req.params.userId,
            _id: req.params.brandId
        });

        res.status(200).json(userBrands);
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
});

router.get('/:brandId/linked-account/:lAccountId', async (req, res) => {
    try {
        const { brandId, lAccountId } = req.params;

        // Suche nach einem Benutzer, der die angegebene brandId und das richtige linked_account enthält
        const brand = await Brand.findOne({ _id: brandId });
        const user = await User.findOne({_id: brand.user_id});

        if (!user) {
            // Wenn der Benutzer nicht gefunden wurde, sende eine entsprechende Antwort
            return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
        }

        // Finde das entsprechende LinkedAccountSchema im Array
        const linkedAccount = user.linked_accounts.find(account => account._id.toString() === lAccountId.toString());

        if (!linkedAccount) {
            // Wenn das LinkedAccountSchema nicht gefunden wurde, sende eine entsprechende Antwort
            return res.status(404).json({ message: 'BrandLinkedAccountSchema.js nicht gefunden.' });
        }
        // Sende das gefundene LinkedAccountSchema als JSON-Antwort
        res.status(200).json(linkedAccount);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
});


router.get('/:brandId/keys/', async (req, res) => {
    try {
        console.log(req.params.brandId)

        res.status(200).json("userBrands");
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
});

// create new brand
router.post('/:userId', async (req, res) => {
    try{
        const { brand } = req.body;
        const { userId } = req.params;

        if(brand && brand._id){
            // update
            const updatedBrand = await Brand.findOneAndUpdate({_id: brand._id});
            res.status(200).json(updatedBrand);
        }else{
            // create

            brand.key = generateApiKey({
                method: 'base32',
                length: 16,
                prefix: 'brand_' + brand.name
            });

            brand.media = new BrandMedia();

            const newBrand = new Brand(brand);
            const newBrandSaved = await newBrand.save();
            res.status(200).json(newBrandSaved);
        }
    }catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
})

router.post('/:brandId/key', async (req, res) => {
    try {
        const { key } = req.body;
        const { brandId } = req.params;

        if (!key) {
            return res.status(400).json({ error: "Key is missing" });
        }

        if (!brandId) {
            return res.status(400).json({ error: "BrandId is missing" });
        }

        const currentBrand = await Brand.findById(brandId);

        if (!currentBrand) {
            return res.status(404).json({ error: `Brand with id ${brandId} not found` });
        }

        if (key._id) {
            // update new token
            key.token = generateApiKey({
                method: 'base32',
                length: 16,
                prefix: 'brand_' + currentBrand.name
            })
            // Update existing key if _id is present
            const result = await Brand.updateOne(
                { _id: brandId, 'keys._id': key._id },
                { $set: { 'keys.$': key } }
            );
            return res.status(200).json(result);
        } else {
            // Create a new key
            const newBrandKey = {
                name: key.name,
                user_id: currentBrand.user_id,
                brand_id: currentBrand._id,
                token: generateApiKey({
                    method: 'base32',
                    length: 16,
                    prefix: 'brand_' + currentBrand.name
                })
            };

            currentBrand.keys.push(newBrandKey);
            await currentBrand.save();
            return res.status(200).json(newBrandKey);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// add new linked account string id to brand
router.post('/:brandId/linked-account/:linkedId', async (req, res) => {
    try {
        const { brandId, linkedId } = req.params;

        if (brandId && linkedId) {
            // Überprüfen, ob der linkedId bereits im Array linked_accounts vorhanden ist
            const brand = await Brand.findById(brandId);

            if (brand && brand.linked_accounts.some(id => id === linkedId)) {
                // Wenn der linkedId bereits existiert, nicht erneut hinzufügen
                res.status(404).json({ message: "Linked account already exists" });
            } else {
                // Wenn der linkedId nicht existiert, zum Array hinzufügen
                const result = await Brand.findByIdAndUpdate(brandId, {
                    $push: { linked_accounts: { _id: linkedId } }
                });
                res.status(200).json(result);
            }
        } else {
            res.status(404).json("Error: brandId || linkedId is undefined");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e});
    }
});

router.post('/:brandId/config', async (req, res) => {
    try {
        const { brandId } = req.params;
        const { config } = req.body;

        if (!brandId) {
            return res.status(404).json("Error: brandId is missing");
        }

        if (!config) {
            return res.status(404).json("Error: config is missing");
        }

        // Update the brand with the new config
        const updatedBrand = await Brand.findOneAndUpdate(
            { _id: brandId },
            { $set: { config: config } },
            //{ new: true } // Return the updated document
        );

        if (!updatedBrand) {
            return res.status(404).json("Error: brand not found");
        }

        res.status(200).json(updatedBrand);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});

router.delete('/:brandId', async (req, res) => {
    try{
        console.log(req.params)
        const deletedBrand = await Brand.findOneAndDelete({_id: req.params.brandId});
        res.status(200).json(deletedBrand);
    }catch (e) {
        console.log(e);
        res.status(404).json({message: e});
    }
})

router.delete('/:brandId/linked-account/:linkedAccountId', async (req, res) => {
    try {
        const { brandId, linkedAccountId } = req.params;

        if (!brandId) {
            return res.status(404).json({ message: "brandId is missing" });
        }

        if (!linkedAccountId || linkedAccountId === 'undefined') {
            return res.status(404).json({ message: "linkedAccountId is missing or undefined" });
        }

        // Überprüfen, ob linkedAccountId im Array linked_accounts existiert
        const brand = await Brand.findById(brandId);

        if (!brand || !brand.linked_accounts.includes(linkedAccountId)) {
            return res.status(404).json({ message: "linkedAccountId not found in linked_accounts array" });
        }

        // Hier weiter mit dem $pull-Update
        const brand_result = await Brand.findByIdAndUpdate(
            brandId,
            { $pull: { linked_accounts: linkedAccountId } },
            //{ new: true }
        );

        res.status(200).json(brand_result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;