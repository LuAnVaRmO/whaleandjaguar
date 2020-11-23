from aylienapiclient import textapi

client = textapi.Client("997164d6", "ea4a6cb4b1fffbc1739ae8995ca50a37")

url = 'https://edition.cnn.com/2019/09/18/health/japan-cyberdyne-brain-wave-exoskeleton-wellness-scn-hnk-intl/index.html'
sentiment = client.Sentiment({'url': url})
print(sentiment)
