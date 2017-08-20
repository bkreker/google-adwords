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
	var cpc_hit
	var cpc_bid
	while (keywords.hasNext()) {
		keyword = keywords.next()
		cpc_hit = keyword.getTopOfPageCpc()
		if (cpc_hit) {
			cpc_bid = cpc_hit * ratio
			keyword.bidding().setCpc(cpc_bid)
		}
	}
}
