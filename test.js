const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testFormSubmission() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--ignore-certificate-errors'))
    .build();

  try {
    console.log("Iniciando o teste de formulário...");

    // Acessa o site
    await driver.get('https://www.w3schools.com/html/html_forms.asp');
    await driver.manage().window().maximize();
    console.log("Página carregada.");

    // Preenche o campo "First name"
    const firstNameField = await driver.wait(until.elementLocated(By.css('input[name="fname"]')), 5000);
    await firstNameField.clear(); // Limpa o campo antes de escrever
    await firstNameField.sendKeys('Lucas');
    console.log("Campo 'First name' preenchido.");

    // Preenche o campo "Last name"
    const lastNameField = await driver.wait(until.elementLocated(By.css('input[name="lname"]')), 5000);
    await lastNameField.clear(); // Limpa o campo antes de escrever
    await lastNameField.sendKeys('Mizuta');
    console.log("Campo 'Last name' preenchido.");

    // Localiza o botão de envio e aguarda até que seja clicável
    const submitButton = await driver.wait(until.elementLocated(By.css('input[type="submit"]')), 5000);
    await driver.wait(until.elementIsEnabled(submitButton), 5000);
    await driver.executeScript("arguments[0].click();", submitButton);
    console.log("Botão de envio clicado.");

    // Aguarda algum tempo para garantir o redirecionamento
    await driver.sleep(2000);

    // Obtém todas as abas abertas
    const handles = await driver.getAllWindowHandles();
    console.log("Número de abas abertas:", handles.length);

    // Muda para a nova aba (supondo que seja a última aba aberta)
    await driver.switchTo().window(handles[1]); 

    // Verifica a URL na nova aba
    const currentUrl = await driver.getCurrentUrl();
    console.log("URL atual na nova aba:", currentUrl);

    if (currentUrl === 'https://www.w3schools.com/action_page.php?fname=Lucas&lname=Mizuta') {
      console.log("Teste concluído com sucesso. O formulário foi enviado e a página foi carregada corretamente.");
    } else {
      throw new Error("A URL não corresponde ao esperado."); // Lança um erro para ir para o catch
  }

  } catch (error) {
    console.error("Erro durante a execução do teste:", error);
  } finally {
    await driver.quit();
  }
}

// Executa o teste
(async () => {
  await testFormSubmission();
})();