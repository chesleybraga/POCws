# POCws

***** SEGURANCA (HTTPS/SSL) NA APLICACAO ANGULAR *****
1) criar pasta "/home/chesley/ssl"<br>
2) criar arquivo "certificate.cnf" na pasta acima e com o conteudo abaixo:<br>
[req]<br>
default_bits = 2048<br>
prompt = no<br>
default_md = sha256<br>
x509_extensions = v3_req<br>
distinguished_name = dn<br>
[dn]<br>
C = GB<br>
ST = London<br>
L = London<br>
O = My Organisation<br>
OU = My Organisational Unit<br>
emailAddress = email@domain.com<br>
CN = localhost<br>
[v3_req]<br>
subjectAltName = @alt_names<br>
[alt_names]<br>
DNS.1 = localhost<br>

3) pelo terminal, entrar na pasta  e executar o comando abaixo:<br>
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 3560 -out localhost.crt -config certificate.cnf<br>

4) subir o servidor com o comando abaixo:<br>
ng serve --ssl --ssl-cert /home/chesley/ssl/localhost.crt --ssl-key /home/chesley/ssl/localhost.key<br>
<br>

***** SEGURANCA (HTTPS/SSL) NA APLICACAO SPRING BOOT *****<br>
1) incluir as propriedades abaixo no arquivo "application.properties"<br>
server.ssl.key-store=classpath:mkyong.p12<br>
server.ssl.key-store-password=123456<br>
server.ssl.keyStoreType=PKCS12<br>

2) executar o comando abaixo no terminal e responder as perguntas<br>
keytool -genkeypair -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore mkyong.p12 -validity 365<br>

a) Enter keystore password: [123456]<br>
b) Re-enter new password: [123456]<br>
c) What is your first and last name? [yong]<br>
d) What is the name of your organizational unit? [mkyong]<br>
e) What is the name of your organization? [mkyong]<br>
f) What is the name of your City or Locality? [EMPTY, PUSH ENTER]<br>
g) What is the name of your State or Province? [EMPTY, PUSH ENTER]<br>
h) What is the two-letter country code for this unit? [EMPTY, PUSH ENTER]<br>
i) Is CN=yong, OU=mkyong, O=mkyong, L=Unknown, ST=Unknown, C=Unknown correct? [yes]<br>

3) copia o arquivo "mkyong.p12" para dentro de "PROJECT_HOME/src/main/resources/"
