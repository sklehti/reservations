describe("Tennis-app ", function () {
  beforeEach(function () {
    //cy.visit("http://localhost:3000");
    cy.visit("https://tennis-app-backend.herokuapp.com/");
  });
  it("front page can be opened", function () {
    cy.contains("Tervetuloa Turun tennisklubin sivuille!");
    cy.contains("Sed nibh nunc, commodo eget laoreet ut, fermentum at sem.");
  });

  it("test the topical page and after that go to the front page", function () {
    cy.contains("Ajankohtaista").click();
    cy.get(".btn").first().click();
    cy.get("#collapse-0");
    cy.wait(300);
    cy.get(".btn").last().click();
    cy.get("#collapse-4");
    cy.wait(300);
    cy.scrollTo(0, 500);
    cy.get(".scrollingTop").click();
    cy.get(".navbar-home-button").click();
  });

  it("reservation table can be opened", function () {
    cy.contains("Ajanvaraukset").click();
    cy.contains("Ajanvaraus").click();
    cy.contains("Valitse pelipäivä:");
  });

  it("find booker informations and updated it", function () {
    cy.contains("Ajanvaraukset").click();
    cy.contains("Varaustiedot").click();
    cy.get("#email").type("testaaja@mail");
    cy.get("#password").type("testaaja");
    cy.get("#login").click();
    cy.contains("Omat tiedot").click();
    cy.contains("testaajantie 1");

    cy.contains("Päivitä yhteystietosi").click();
    cy.get("#address").clear();
    cy.get("#address").type("uusitestaajatie 6");
    cy.contains("Muokkaa").click();
    cy.contains("Haluatko varmasti muuttaa yhteystiedot?");
    cy.get("button").contains("OK").click();
    cy.get("button").contains("Ok!").click();

    cy.contains("Omat tiedot").click();
    cy.contains("uusitestaajatie 6");
    cy.wait(500);

    cy.contains("Päivitä yhteystietosi").click();
    cy.get("#address").clear();
    cy.get("#address").type("testaajantie 1");
    cy.contains("Muokkaa").click();
    cy.contains("Haluatko varmasti muuttaa yhteystiedot?");
    cy.get("button").contains("OK").click();
    cy.get("button").contains("Ok!").click();

    cy.contains("Omat varaukset").click();
    cy.contains("Päivä");
    cy.contains("Aika");
    cy.contains("Kenttä");

    cy.get("button").contains("Kirjaudu ulos").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("Ajanvaraukset").click();
    cy.contains("Varaustiedot").click();
    cy.get("#email").type("vaaratestaaja@mail");
    cy.get("#password").type("vaaratestaaja");
    cy.get("#login").click();
    cy.contains("Kirjautumistietosi ovat virheelliset!");
  });

  it("fill in all the fields error", function () {
    cy.contains("Pelikaveri").click();
    cy.get("button").contains("Lähetä").click();
    cy.contains("Täytä kaikki kohdat!");
  });

  it("find game buddies", function () {
    cy.contains("Pelikaveri").click();

    cy.get("#name").type("testaaja");
    cy.contains("Aloittelija").click();
    cy.contains("8:00 - 12:00 (aamu)").click();
    cy.get("#email").type("testaaja@mail");
    cy.get("#permission").click();
    cy.get("button").contains("Lähetä").click();
    cy.contains("Olet tallentamassa seuraavia tietoja:");
    cy.get("button").contains("OK").click();
    cy.contains("Tietosi on tallennettu!");
    cy.get("button").contains("Ok!").click();
    cy.contains("Profiliisi yhteen sopivat pelikaverit:");

    cy.get(".navbar-titles").click();
  });

  it("test contacts page", function () {
    cy.contains("Yhteystiedot").click();
    cy.get("#name").type("testaaja");
    cy.get("#email").type("testaaja@mail");
    cy.get("#subject").type("testi viesti");
    cy.get("#message").type("tekstiä...");
    cy.wait(500);
    cy.get("button").contains("Lähetä").click();
    cy.contains("Haluatko lähettää viestin?");
    cy.get("button").contains("OK").click();
    cy.contains("Viesti on lähetetty!");
    // cy.get("button").contains("Ok!").click();
  });
});
