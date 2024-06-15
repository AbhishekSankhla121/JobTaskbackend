import Data from "../model/Data.js"
export const getData = async (req, res, next) => {
    const condition = req.query.condition || "";


    try {
        const info = await Data.find().sort({ timestamp: "desc" });
        const newCondition = info.filter((item) => { return item.condition === "new" })
        const usedCondition = info.filter((item) => { return item.condition === "used" })
        const cpoCondition = info.filter((item) => { return item.condition === "cpo" })
        const newConditionUnits = newCondition.length;
        const usedConditionUnits = usedCondition.length;
        const cpoConditionUnits = cpoCondition.length;
        const sum = (arr = []) => {
            return arr
                .map(item => parseFloat(item.price.split(" ")[0]))
                .reduce((total, price) => total + price, 0);
        }
        // Function to calculate average
        const average = (total, noOfItems) => {
            return parseFloat(total / noOfItems).toFixed(2);
        };

        const newConditionMsrp = sum(newCondition);
        const cpoConditionMsrp = sum(cpoCondition);
        const usedConditionMsrp = sum(usedCondition);

        const newConditionAverage = average(newConditionMsrp, newConditionUnits);
        const usedConditionAverage = average(usedConditionMsrp, usedConditionUnits);
        const cpoConditionAverage = average(cpoConditionMsrp, cpoConditionUnits);

        const infoGraph = await Data.find({ condition }).sort({ timestamp: "desc" });

        const infoGraphSatsticalData = [];
        let statsticaslData = {
            timestamp: [],
            inventoryCount: 0,
            averageMsrp: 0,
            sum: 0
        };

        for (let i = 0;  i < infoGraph.length && infoGraphSatsticalData.length < 13; i++) {
            const currentItem = infoGraph[i];
            const currentDate = currentItem.timestamp.toISOString().split("T")[0];
            const currentPrice = parseFloat(currentItem.price.split(" ")[0]);

            if (statsticaslData.timestamp.length === 0) {
                statsticaslData.timestamp.unshift(currentDate);
                statsticaslData.inventoryCount = 1;
                statsticaslData.sum = currentPrice;
                statsticaslData.averageMsrp = (statsticaslData.sum / statsticaslData.inventoryCount).toFixed(0);
            } else if (statsticaslData.timestamp[0] === currentDate) {
                statsticaslData.inventoryCount += 1;
                statsticaslData.sum += currentPrice;
                console.log(statsticaslData.sum / statsticaslData.inventoryCount);
                statsticaslData.averageMsrp = (statsticaslData.sum / statsticaslData.inventoryCount).toFixed(2);
            } else {
                infoGraphSatsticalData.push({ ...statsticaslData });

                statsticaslData = {
                    timestamp: [currentDate],
                    inventoryCount: 1,
                    sum: currentPrice,
                    averageMsrp: currentPrice
                };
            }
        }


  infoGraphSatsticalData.sort((a, b) => new Date(a.timestamp[0]) - new Date(b.timestamp[0]));
        res.status(200).json({
            newConditionUnits,
            usedConditionUnits,
            cpoConditionUnits,
            newConditionMsrp,
            usedConditionMsrp,
            cpoConditionMsrp,
            newConditionAverage,
            cpoConditionAverage,
            usedConditionAverage,
            infoGraphSatsticalData,

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' }); // Handle errors
    }
};
