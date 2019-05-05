wxapi = {}

wxapi.get_token = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}"
wxapi.get_ticket = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={ACCESS_TOKEN}&type=jsapi"
wxapi.authorize = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={APPID}&redirect_uri={REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
wxapi.get_access_token = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={APPID}&secret={APPSECRET}&code={CODE}&grant_type=authorization_code"
wxapi.sign_format = "jsapi_ticket={TICKET}&noncestr={NONCESTR}&timestamp={TIMESTAMP}&url={URL}"
