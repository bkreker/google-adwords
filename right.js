function main() {
	var keywords = AdWordsApp.keywords()
		.withCondition('CampaignStatus != REMOVED')
		.withCondition('AdGroupStatus != REMOVED')
		.withCondition('Status != REMOVED')
		.get()
	set_cpc(keywords, 1)
}
function set_cpc(keywords, ratio) {
	var keyword
	var cpc_bid
	var cpc_hit
	while (keywords.hasNext()) {
		keyword = keywords.next()
		keyword.bidding().setCpc(ratio)
	}
}
