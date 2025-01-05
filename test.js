const { Builder, By, until } = require('selenium-webdriver');

async function testFormSubmission() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log("Iniciando o teste de formulário...");

    // Acessa o site com o formulário
    await driver.get('https://www.w3schools.com/html/html_forms.asp');
    console.log("Página carregada.");

    // Preenche o campo "First name"
    const firstNameField = await driver.wait(until.elementLocated(By.css('input[name="firstname"]')), 10000);
    await firstNameField.sendKeys('John');
    console.log("Campo 'First name' preenchido.");

    // Preenche o campo "Last name"
    const lastNameField = await driver.wait(until.elementLocated(By.css('input[name="lastname"]')), 10000);
    await lastNameField.sendKeys('Doe');
    console.log("Campo 'Last name' preenchido.");

    // Localiza e clica no botão de envio
    const submitButton = await driver.wait(until.elementLocated(By.css('input[type="submit"]')), 10000);
    await submitButton.click();
    console.log("Botão de envio clicado.");

    // Aguarda um tempo para capturar possíveis mensagens (exemplo: mensagens de erro ou sucesso)
    await driver.sleep(2000);

    console.log("Teste concluído.");

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
