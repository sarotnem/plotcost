export default {
    methods: {
        findMinimumPaperWaste(width, height) {
            var waste = [594 - width, 914 - width, 594 - height, 914 - height];

            return waste.indexOf(
                Math.min(
                    ...waste.filter(function (x) {
                        return x >= 0;
                    })
                )
            );
        },

        calculatePrice: function(width, height, copies, costPerSqMt) {
            var price = 0.0;

            var minWasteIndex = this.findMinimumPaperWaste(width, height)
      
            if (minWasteIndex == 0) price = ((0.6 * height) / 1000) * costPerSqMt * copies
            else if (minWasteIndex == 1) price = ((0.9 * height) / 1000) * costPerSqMt * copies
            else if (minWasteIndex == 2) price = ((0.6 * width) / 1000) * costPerSqMt * copies
            else price = ((0.9 * width) / 1000) * costPerSqMt * copies
      
            return price;
          }
    }
}