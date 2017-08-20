function main() {
	var keywords = AdWordsApp.keywords()
		.withCondition('CampaignStatus = PAUSED')
		.withCondition('AdGroupStatus = PAUSED')
		.withCondition('Status = PAUSED')
		.get()
	set_cpc(keywords, 0)
}
function set_cpc(keywords, ratio) {
	var keyword
	var cpc_min
	var cpc_max
	var cpc_bid
	while (keywords.hasNext()) {
		keyword = keywords.next()
		cpc_min = keyword.getFirstPageCpc()
		if (cpc_min) {
			cpc_max = keyword.getTopOfPageCpc()
			if (cpc_max) {
				cpc_bid = cpc_max + Math.pow(cpc_max - cpc_min, 1 / Math.E) * ratio
			} else {
				cpc_bid = cpc_min + Math.pow(cpc_min, 1 / Math.E) * ratio
			}
			keyword.bidding().setCpc(cpc_bid)
		}
		Logger.log([keyword.getText(), cpc_min, cpc_max, cpc_bid].join(' - '))
	}
}
