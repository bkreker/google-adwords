function main() {
	var keywords = AdWordsApp.keywords()
		.withCondition('CampaignStatus = ENABLED')
		.withCondition('AdGroupStatus = ENABLED')
		.withCondition('Status = ENABLED')
		.get()
	set_cpc(keywords, 1)
}
function set_cpc(keywords, ratio) {
	var keyword
	var cpc_min
	var cpc_max
	var cpc_bid
	while (keywords.hasNext()) {
		keyword = keywords.next()
		cpc_max = keyword.getTopOfPageCpc()
		if (cpc_max) {
			cpc_bid = cpc_max * ratio
		} else {
			cpc_min = keyword.getFirstPageCpc()
			if (cpc_min) {
				cpc_bid = cpc_min * ratio
			}
		}
		if (cpc_bid) {
			keyword.bidding().setCpc(cpc_bid)
		}
	}
}
