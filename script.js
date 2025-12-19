$('.gallery-slider').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                    },
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    }
                ]
            }); 
            
                document.addEventListener('DOMContentLoaded', function() {
                    const form = document.querySelector('form[action="#"]');
                    const sendBtn = document.querySelector('button[name="sendButton"]');
                    
                    const name = document.querySelector('input[name="firstName"]');
                    const mail = document.querySelector('input[name="mail"]');
                    const telep = document.querySelector('input[name="telephone"]');
                    
                    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const telRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                    
                    const FORMCARRY_URL = "https://formcarry.com/s/u00yylT5Ghj";
                    
                    function checkValidName() {
                        if(name.value.trim() === "") {
                            alert("Ошибка! Поле 'Имя' обязательно для заполнения");
                            return false;
                        }
                        if(!nameRegex.test(name.value)) {
                            alert("Ошибка! Имя должно содержать только буквы");
                            return false;
                        }
                        return true;
                    }
                    
                    function checkValidEmail() {
                        if(mail.value.trim() === "") {
                            alert("Ошибка! Поле 'Email' обязательно для заполнения");
                            return false;
                        }
                        if(!emailRegex.test(mail.value)) {
                            alert("Ошибка! Введите корректный email адрес");
                            return false;
                        }
                        return true;
                    }
                    
                    function checkValidTel() {
                        if(telep.value.trim() === "") {
                            alert("Ошибка! Поле 'Телефон' обязательно для заполнения");
                            return false;
                        }
                        if(!telRegex.test(telep.value)) {
                            alert("Ошибка! Введите корректный номер телефона");
                            return false;
                        }
                        return true;
                    }
                    
                    function validateForm() {
                        return checkValidName() && checkValidTel() && checkValidEmail();
                    }
                    
                    async function sendForm(e) {
                        e.preventDefault(); 
                        
                        if (!validateForm()) {
                            return;
                        }
                        
                        const formData = {
                            firstName: name.value,
                            mail: mail.value,
                            telephone: telep.value,
                        };
                        
                        const originalText = sendBtn.textContent;
                        sendBtn.disabled = true;
                        sendBtn.textContent = "Отправка...";
                        
                        try {
                            const response = await fetch(FORMCARRY_URL, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            });
                            
                            const result = await response.json();
                            
                            if (response.ok && result.code === 200) {
                                alert("Форма успешно отправлена! Спасибо за ваше сообщение.");
                                form.reset(); 
                            } else {
                                alert("Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
                            }
                        } catch (error) {
                            alert("Произошла ошибка при отправке формы. Проверьте подключение к интернету.");
                            console.error("Ошибка отправки формы:", error);
                        } finally {
                            sendBtn.disabled = false;
                            sendBtn.textContent = originalText;
                        }
                    }
                    
                    
                    form.addEventListener('submit', sendForm);
                    name.addEventListener('change', checkValidName);
                    mail.addEventListener('change', checkValidEmail);
                    telep.addEventListener('change', checkValidTel);
                });