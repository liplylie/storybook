import json

# import api keys
with open('../sensitive.json') as data_file:    
    sensitive = json.load(data_file)
    azure_key = sensitive['AZURE_KEY']

def get_tags(request_body):
  print('adding photo...')
  import httplib, urllib, base64

  headers = {
      # Request headers
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': azure_key
  }

  params = urllib.urlencode({
      # Request parameters
      'visualFeatures': 'Categories,Description,Color',
      'language': 'en',
  })

  try:
      conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
      conn.request("POST", "/vision/v1.0/analyze?%s" % params, request_body, headers)
      response = conn.getresponse()
      data = response.read()
      conn.close()
  except Exception as e:
      print("[Errno {0}] {1}".format(e.errno, e.strerror))

  stringified_data = json.loads(data)
  print('result is: ', stringified_data['description']['tags'])
  return stringified_data['description']['tags']
