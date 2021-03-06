


                //Define si la pagina ya se ha cargado completamente o no:
                var pagina_cargada = false;

                //Define si el juego esta bloqueado:
                var juego_bloqueado = true;

                //Define si el juego ha sido pausado:
                var juego_pausado = false;

                //Define si el juego ha comenzado o no:
                var se_ha_comenzado = false;

                //Define si lo que se intenta arrastrar es un campo seleccionable o no (para no arrastrarlo si lo es):
                var campo_seleccionable = false;

                //Variable que define si se arrastra un objeto y cual es:
                var arrastrando_objeto = false;

                //Variables que calcularan la diferencia entre las coordenadas del mouse y las del div que se arrastre:
                var diferencia_posicion_horizontal = false;
                var diferencia_posicion_vertical = false;

                //Se define la variable que guardara el primer evento que se ejecute (para que no se ejecute onKeyDown y onKeyPress a la vez en Firefox, ya que podria causar dos rotaciones):
                var primer_evento = "";
                
                //Variable que guardara el serInterval de la animacion del mensaje:
                var animacion_mensaje = setInterval("", 9999);

                //Define la ultima celda marcada (si no existe, es -1):
                var ultima_celda_resaltada = -1;
                
                //Define si al pasar el raton por una celda se debe pintar o no:
                var pintar = false;
                
                //Define si al pasar el raton por una celda se debe borrar o no:
                var borrar = false;
                
                //Define si es posible pintar o no:
                var se_puede_pintar = true;

                //Variable que guardara el serInterval de los ciclos:
                var ciclos = setInterval("", 9999);

                //Variable que guarda cada cuantos milisegundos se hara cada ciclo (y su tope):
                var ciclos_milisegundos = 500;
                var ciclos_milisegundos_minimo = 1; //Minimo de milisegundos entre ciclos.
                var ciclos_milisegundos_maximo = 9999; //Maximo de milisegundos entre ciclos.

                //Variable que guarda el interval que va incrementando o decrementando la velocidad al pulsar el boton del raton:
                var modificando_velocidad = setInterval("", 9999);
                
                //Numero de ciclos que se han hecho:
                var numero_ciclos = 0;
                
                //Guarda el numero de ciclos que han hecho falta para que una poblacion haya sido estable:
                var ciclos_estable = -1;

                //Define si la poblacion es estable o no:
                var estable = true;
                
                //Define si la poblacion se ha extinguido o no:
                var extinta = true;

                //Guarda el numero de habitantes (individuos u organismos o como se les quiera llamar):
                var poblacion = 0;

                //Ancho y alto de cada celda (y sus minimos y maximos):
                var celda_ancho = 15;
                var celda_alto = 15;
                var celda_ancho_minimo = 1; //Minimo que puede tomar una celda de ancho.
                var celda_ancho_maximo = 200; //Maximo que puede tomar una celda de ancho.
                var celda_alto_minimo = 1; //Minimo que puede tomar una celda de alto.
                var celda_alto_maximo = 200; //Maximo que puede tomar una celda de alto.
                
                //Escpaciado entre celda y celda (y su minimo y maximo):
                var celda_espaciado = 2;
                var celda_espaciado_minimo = 0; //Minimo que puede tomar el espaciado entre celdas.
                var celda_espaciado_maximo = 200; //Maximo que puede tomar el espaciado entre celdas.

                //Ancho y alto del tablero (y sus topes tambien):
                var tablero_ancho = 40;
                var tablero_alto = 20;
                var tablero_ancho_maximo = 80; //Maximo que puede alcanzar el tablero de ancho.
                var tablero_alto_maximo = 40; //Maximo que puede alcanzar el tablero de alto.
                var tablero_ancho_minimo = 1; //Maximo que puede alcanzar el tablero de ancho.
                var tablero_alto_minimo = 1; //Maximo que puede alcanzar el tablero de alto.
                
                //Ancho y alto del tablero de la ultima vez que se creo:
                var tablero_ancho_ultimo = 0;
                var tablero_alto_ultimo = 0;
                
                //Matriz que guarda el tablero:
                var tablero = new Array(tablero_alto);
                for (var x = 0; x < tablero_alto; x++) { tablero[x] = new Array(tablero_ancho); }

                //Define si estan activados los alert() (si no lo estan, se utilizara un substituto):
                var alerts_activados = true;

                //Define los colores del juego:
                var colores = new Array(4);
                colores["celda_vacia"] = "#000000"; //Color de las celdas sin individuo.
                colores["celda_ocupada"] = "#00ff00"; //Color de las celdas con individuo.
                colores["celda_resaltada"] = "#00aa00"; //Color de las celdas resaltadas (siempre sin individuo).
                colores["multicolor"] = new Array(9);
                colores["multicolor"][0] = "#ddaadd"; //Color cuando la celda no tiene vecinos (solo si hay multicolor).
                colores["multicolor"][1] = "#ffdd00"; //Color cuando la celda tiene 1 vecino (solo si hay multicolor).
                colores["multicolor"][2] = "#ff0000"; //Color cuando la celda tiene 2 vecinos (solo si hay multicolor).
                colores["multicolor"][3] = "#ffddff"; //Color cuando la celda tiene 3 vecinos (solo si hay multicolor).
                colores["multicolor"][4] = "#0000ff"; //Color cuando la celda tiene 4 vecinos (solo si hay multicolor).                
                colores["multicolor"][5] = "#aa00ff"; //Color cuando la celda tiene 5 vecinos (solo si hay multicolor).
                colores["multicolor"][6] = "#00ddff"; //Color cuando la celda tiene 6 vecinos (solo si hay multicolor).
                colores["multicolor"][7] = "#aaffaa"; //Color cuando la celda tiene 7 vecinos (solo si hay multicolor).                
                colores["multicolor"][8] = "#ffaabb"; //Color cuando la celda tiene 8 vecinos (solo si hay multicolor).

                //Define si el juego es multicolor o no (las celdas cambian el color segun sus vecinos):
                var multicolor = false;

                //Define si el mundo es esferico o no:
                var mundo_esferico = false;


                //Funcion que muestra un mensaje:
                function mostrar_mensaje(mensaje)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }
                    //Se pone el mensaje en el div correspondiente:
                    document.getElementById("mensaje").innerHTML = mensaje;
                    //Si el mensaje esta vacio, se deja de mostrar el div y su animacion se detiene:
                    if (mensaje == "")
                    {
                        if (!juego_pausado)
                        {
                            clearInterval(animacion_mensaje);
                            juego_bloqueado = false;
                            document.getElementById("mensaje").style.visibility = "hidden";
                        }
                        else { mostrar_mensaje('Pausa'); }
                    }
                    else
                    {
                        //Bloquea el juego si no ha sido pausado (para poder pintar si se pausa):
                        if (!juego_pausado) { juego_bloqueado = true; }
                        document.getElementById("mensaje").style.visibility = "visible";
                        //Se inicia su animacion:
                        clearInterval(animacion_mensaje); //Elimina una animacion interior, por si la huviera.
                        animacion_mensaje = setInterval("animar_mensaje();", 500);
                    }
                }

                
                //Funcion que anima el mensaje:
                function animar_mensaje()
                {
                    if (document.getElementById("mensaje").style.visibility == "hidden") { document.getElementById("mensaje").style.visibility = "visible"; }
                    else { document.getElementById("mensaje").style.visibility = "hidden" }
                }


                //Funcion que muestra una alerta (alternativa a alert()):
                function mostrar_alerta(mensaje, reiniciar_al_aceptar)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }
                    //Se define si se reinicia o no al aceptar:
                    
                    //Se pone el mensaje en el div correspondiente:
                    document.getElementById("alerta_mensaje").innerHTML = mensaje;
                    //Si el mensaje esta vacio, se deja de mostrar el div:
                    if (mensaje == "") { document.getElementById("alerta").style.visibility = "hidden"; document.getElementById("alerta_sombra").style.visibility = "hidden"; }
                    else { document.getElementById("alerta").style.visibility = "visible"; document.getElementById("alerta_sombra").style.visibility = "visible"; }
                    //Enfoca el boton (para que solo haga falta apretar intro o espacio para aceptar):
                    if (document.getElementById("alerta").style.visibility == "visible") { document.getElementById('formulario_alerta').boton_alerta.focus(); }
                }


                //Funcion que actualiza el panel:
                function actualizar_panel()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    var es_estable = estable ? "si" : "no";
                    if (estable && ciclos_estable >= 0) { es_estable = "si (a los " + ciclos_estable + " ciclos)"; }
                    var esta_extinta = extinta ? "[Extinta]" : "[Viviente]";
                    //var esta_pausado = juego_pausado ? "[Juego parado]" : "[Juego en curso]";

                    document.getElementById("poblacion").innerHTML = poblacion;
                    document.getElementById("estable").innerHTML = es_estable;
                    document.getElementById("estado_poblacion").innerHTML = esta_extinta;
                    document.getElementById("ciclos").innerHTML = numero_ciclos;
                   
                }


                //Funcion que selecciona visualmente un boton:
                function seleccionar_boton(boton, borde)
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }

                    //Si el borde enviado no es valido, se define como 1px:
                    if (isNaN(borde) || !isNaN(borde) && borde < 0) { borde = 1; }

                    //Borra todos los botones resaltados que pudieran existir y su etiqueta:
                    if (!se_ha_comenzado || juego_pausado) { document.getElementById("boton_play").style.border = "1px solid #00aa00"; } //Si no se ha comenzado el juego esta pausado, elimina su seleccion.
                    if (!juego_pausado) { document.getElementById("boton_pausa").style.border = "1px solid #00aa00"; } //Si el juego no esta pausado, elimina su seleccion.
                    document.getElementById("boton_stop").style.border = "1px solid #00aa00";
                    document.getElementById("boton_incrementar_velocidad").style.border = "1px solid #00aa00";
                    document.getElementById("boton_decrementar_velocidad").style.border = "1px solid #00aa00";
                    document.getElementById("boton_pintar_aleatoriamente").style.border = "1px solid #00aa00";
                    if (mundo_esferico) { document.getElementById("boton_mundo_esferico").style.border = "1px solid #556655"; } else { document.getElementById("boton_mundo_esferico").style.border = "1px solid #00aa00"; }
                    if (multicolor) { document.getElementById("boton_multicolor").style.border = "1px solid #556655"; } else { document.getElementById("boton_multicolor").style.border = "1px solid #00aa00"; }
                    document.getElementById("boton_abrir_mundo").style.border = "1px solid #00aa00";
                    document.getElementById("boton_guardar_mundo").style.border = "1px solid #00aa00";
                    document.getElementById("etiqueta_boton").style.visibility = "hidden";

                    //Si se ha enviado resaltar un boton:
                    if (boton != "")
                    {
                        //Si el juego esta pausado y se ha enviado marcar el boton de pausa, sale de la funcion:
                        if (juego_pausado && boton.id == "boton_pausa") { return; }
                        //...y si el juego ha comenzado, no esta en pausa, y se ha enviado marcar el boton de play, sale de la funcion:
                        else if (se_ha_comenzado && !juego_pausado && boton.id == "boton_play") { return; }
                        //Resalta el boton, a no ser que el juego no haya comenzado y se haya enviado marcar el boton pausa:
                        var borde_color = (borde == 2) ? "#00ff00" : "#004400"; //Define el color del borde segun sea del menu superior o inferior.
                        if (se_ha_comenzado || !se_ha_comenzado && boton.id != "boton_pausa") {  boton.style.border = borde + "px solid " +  borde_color; }
                        //Determina su etiqueta:
                        var etiqueta = boton.id.replace(/boton_/gi, "");
                        etiqueta = etiqueta.replace(/_/gi, " ");
                        etiqueta = etiqueta.replace(/esferico/gi, "esf&eacute;rico");
                        //Muestra la etiqueta de su accion (si es de 2 pixels es el menu inferior, si no es del superior):
                        document.getElementById("etiqueta_boton").style.left = parseInt(document.getElementById("panel").style.left) + parseInt(boton.style.left) + parseInt(parseInt(boton.style.width) / 5) + "px";
                        var panel = (borde == 2) ? "panel" : "menu_superior";
                        document.getElementById("etiqueta_boton").style.top = parseInt(document.getElementById(panel).style.top) + parseInt(boton.style.height) + parseInt(parseInt(document.getElementById("etiqueta_boton").style.height) / 2) + "px";
                        document.getElementById("etiqueta_boton").innerHTML = etiqueta;
                        //Si no ha comenzado y se ha enviado marcar el boton pausa:
                        if (!se_ha_comenzado && boton.id == "boton_pausa") { document.getElementById("etiqueta_boton").style.color = "#556655"; }
                        //...pero si no, pone el color negro:
                        else { document.getElementById("etiqueta_boton").style.color = "#002200"; }
                        
                        document.getElementById("etiqueta_boton").style.visibility = "visible";
                    }
                }


                //Funcion que resalta una celda:
                function resaltar_celda(celda)
                {
                    //Si el juego esta bloqueado, sale de la funcion:
                    if (juego_bloqueado) { return; }

                    var fila = Math.floor(celda / tablero_ancho);
                    var columna = celda % tablero_ancho;
                    var fila_anterior = Math.floor(ultima_celda_resaltada / tablero_ancho);
                    var columna_anterior = ultima_celda_resaltada % tablero_ancho;
                    
                    //Si la ultima celda resaltada es valida ni hay un individuo en ella, la pone normal (comprueba que la fila y columna aneteriores sean validas):
                    if (ultima_celda_resaltada >= 0 && ultima_celda_resaltada < tablero_ancho * tablero_alto && fila_anterior >= 0 && columna_anterior >= 0 && fila_anterior < tablero_alto && columna_anterior < tablero_ancho)
                    {
                        if (tablero[fila_anterior][columna_anterior] == 0) { document.getElementById("celda_" + ultima_celda_resaltada).style.background = colores["celda_vacia"]; }
                    }

                    //Si la celda enviada a marcar es valida y no hay ningun individuo, la marca (comprueba que la fila y columna sean validas):
                    if (celda >= 0 && celda < tablero_ancho * tablero_alto && fila >= 0 && columna >= 0 && fila < tablero_alto && columna < tablero_ancho)
                    {
                        if (tablero[fila][columna] == 0) { document.getElementById("celda_" + celda).style.background = colores["celda_resaltada"]; }
                    }
                    
                    //Define como la ultima celda resaltada la que nos ocupa:
                    ultima_celda_resaltada = celda;                    
                }


                //Funcion que arrastra un div:
                function arrastrar(e)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Si se ha parado de arrastrar, sale de la funcion:
                    if (!arrastrando_objeto) { diferencia_posicion_horizontal = false; diferencia_posicion_vertical = false; return; }
                    //...pero si se ha enviado arrastrar, se arrastra:
                    else
                    {
                        //Variable para saber si estamos en Internet Explorer o no:
                        var ie = document.all ? true : false;
                        //Si estamos en internet explorer, se recogen las coordenadas del raton de una forma:
                        if (ie)
                        {
                            posicion_x_raton = event.clientX + document.body.scrollLeft;
                            posicion_y_raton = event.clientY + document.body.scrollTop;
                        }
                        //...pero en otro navegador, se recogen de otra forma:
                        else
                        {
                            //document.captureEvents(Event.MOUSEMOVE);
                            posicion_x_raton = e.pageX;
                            posicion_y_raton = e.pageY;
                        } 
                        //Si las coordenadas X o Y del raton son menores que cero, se ponen a cero:
                        if (posicion_x_raton < 0) { posicion_x_raton = 0; }
                        if (posicion_y_raton < 0) { posicion_y_raton = 0; }

                        //Si se ha enviado arrastrar y no es un campo seleccionable, se arrastra:
                        //if (arrastrar_opciones && !campo_seleccionable)
                        if (!campo_seleccionable)
                        {
                            //Si es la primera vez que se arrastra despues del click, se calcula la diferencia inicial:
                            if (!diferencia_posicion_horizontal || !diferencia_posicion_vertical)
                            {
                                //Se calcula la diferencia que hay horizontalmente entre el raton y el div de los alerts:
                                diferencia_posicion_horizontal = eval(posicion_x_raton - parseInt(arrastrando_objeto.style.left));
                                //Se calcula la diferencia que hay verticalmente entre el raton y el div de los alerts:
                                diferencia_posicion_vertical = eval(posicion_y_raton - parseInt(arrastrando_objeto.style.top));
                            }
                            //Se calculan las nuevas coordenadas del div de los alerts:
                            var posicion_left = posicion_x_raton - diferencia_posicion_horizontal;
                            var posicion_top = posicion_y_raton - diferencia_posicion_vertical;
                            //Si alguna d las coordenadas fuera menos que cero, se ponen a cero:
                            if (posicion_left < 0) { posicion_left = 0; }
                            if (posicion_top < 0) { posicion_top = 0; }
                            //Se aplican las coordenadas al div de los alerts:
                            arrastrando_objeto.style.left = posicion_left + "px";
                            arrastrando_objeto.style.top = posicion_top + "px";
                            document.getElementById(arrastrando_objeto.sombra).style.left = posicion_left  + 4 + "px";
                            document.getElementById(arrastrando_objeto.sombra).style.top = posicion_top  + 4 + "px";
                        }
                    }
                }

                
                //Funcion que abre el dialogo de guardar mundo:
                function abrir_guardar_mundo(accion)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Si se ha enviado guardar, hace una pausa del juego:
                    if (accion == "guardar" && se_ha_comenzado)
                    {
                        if (!juego_pausado)
                        {
                            juego_pausado = true;
                            seleccionar_boton(document.getElementById('boton_pausa'), 2);
                            parar_ciclos();
                            mostrar_mensaje('Pausa')
                        }
                    }

                    //Cambia el titulo del dialogo:
                    if (accion == "guardar") { document.getElementById("abrir_guardar_titulo").innerHTML = "Guardar mundo"; }
                    else { document.getElementById("abrir_guardar_titulo").innerHTML = "Abrir mundo"; }
                    
                    //Cambia el value y el title del boton del dialogo:
                    if (accion == "guardar") { document.getElementById("boton_abrir_guardar").title = "Generar URL"; document.getElementById("boton_abrir_guardar").value = "Generar URL"; }
                    else { document.getElementById("boton_abrir_guardar").title = "Abrir"; document.getElementById("boton_abrir_guardar").value = "Abrir mundo"; }

                    //Hace visible el div correspondiente a la accion:
                    if (accion == "guardar") { document.getElementById("abrir_guardar_contenido_guardar").style.visibility = "visible"; document.getElementById("abrir_guardar_contenido_guardar").style.display = "block"; }
                    else { document.getElementById("abrir_guardar_contenido_guardar").style.display = "none"; document.getElementById("abrir_guardar_contenido_guardar").style.visibility = "hidden"; }
                    
                    //Modifica los valores del formulario:
                    if (accion == "guardar")
                    {
                        //Guarda en una cadena de texto la matriz del tablero (el mundo):
                        var tablero_plano = "";
                        for (x = 0; x < tablero_alto; x++)
                        {
                            for (y = 0; y < tablero_ancho; y++)
                            {
                                tablero_plano += tablero[x][y];
                            }
                            tablero_plano += "<br>";
                        }
                        document.getElementById("abrir_guardar_mapa").innerHTML = tablero_plano;
                        document.getElementById("abrir_guardar_reproducir_automaticamente").checked = false;
                        document.getElementById("abrir_guardar_mundo_esferico").checked = mundo_esferico;
                        document.getElementById("abrir_guardar_multicolor").checked = multicolor;
                        document.getElementById("abrir_guardar_esconder_menu_superior").checked = false;
                        document.getElementById("abrir_guardar_esconder_menu_inferior").checked = false;
                        document.getElementById("abrir_guardar_esconder_informacion").checked = false;
                        document.getElementById("abrir_guardar_impedir_pintar").checked = false;

                        document.getElementById("abrir_guardar_velocidad").value = ciclos_milisegundos;
                        document.getElementById("abrir_guardar_celda_ancho").value = celda_ancho;
                        document.getElementById("abrir_guardar_celda_alto").value = celda_alto;
                        document.getElementById("abrir_guardar_celda_espaciado").value = celda_espaciado;

                        document.getElementById("abrir_guardar_x").value = tablero_ancho;
                        document.getElementById("abrir_guardar_y").value = tablero_alto;
                        document.getElementById("abrir_guardar_x").disabled = true;
                        document.getElementById("abrir_guardar_y").disabled = true;
                        //document.getElementById("abrir_guardar_url").disabled = true;

                        generar_url();
                    }
                    else
                    {
                        document.getElementById("abrir_guardar_url").value = "";
                        //document.getElementById("abrir_guardar_url").disabled = false;
                    }

                    //Pone el mismo ancho a la sombra:
                   

                    //Muestra el formulario:
                    document.getElementById("abrir_guardar").style.visibility = "visible";
                    //document.getElementById("abrir_guardar_sombra").style.visibility = "visible";
                }
                
                
                //Funcion que procesa el formulario de abrir/guardar:
                function abrir_guardar_procesar()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    if (document.getElementById("abrir_guardar_titulo").innerHTML == "Guardar mundo") { generar_url(); }
                    else { cargar_mundo(document.getElementById("abrir_guardar_url").innerHTML); }
                }
                

                //Funcion que genera la URL del juego para poder guardarla:
                function generar_url()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    var url = window.location.href;
                    if (url.indexOf("?") != -1) { url = url.substring(0, url.indexOf("?")); }

                    var mapa = document.getElementById("abrir_guardar_mapa").innerHTML;
                    mapa = mapa.replace(/(<([^>]+)>)/gi,""); //Borra todos los tags.
                    mapa = escape(mapa); //Escapa el mapa (por si hubieran signos "peligrosos" para pasar por URL, aunque no deberia).
                    if (mapa.indexOf("1") == -1) { mapa = "0"; } //Si el mapa esta vacio, con enviar un cero (e incluso nada) ya es suficiente.
                    
                    url += "?world=" + mapa;
                    url += "&width=" + escape(document.getElementById("abrir_guardar_x").value);
                    url += "&height=" + escape(document.getElementById("abrir_guardar_y").value);

                    url += (document.getElementById("abrir_guardar_reproducir_automaticamente").checked) ? "&play=1" : "";
                    url += (document.getElementById("abrir_guardar_mundo_esferico").checked) ? "&spherical=1" : "";
                    url += (document.getElementById("abrir_guardar_multicolor").checked) ? "&multicolor=1" : "";
                    url += (document.getElementById("abrir_guardar_esconder_menu_superior").checked) ? "&hidemenu=1" : "";
                    url += (document.getElementById("abrir_guardar_esconder_menu_inferior").checked) ? "&hidecontrols=1" : "";
                    url += (document.getElementById("abrir_guardar_esconder_informacion").checked) ? "&hideinfo=1" : "";
                    url += (document.getElementById("abrir_guardar_impedir_pintar").checked) ? "&undrawable=1" : "";

                    url += "&speed=" + escape(document.getElementById("abrir_guardar_velocidad").value);
                    url += "&cellwidth=" + escape(document.getElementById("abrir_guardar_celda_ancho").value);
                    url += "&cellheight=" + escape(document.getElementById("abrir_guardar_celda_alto").value);
                    url += "&cellpadding=" + escape(document.getElementById("abrir_guardar_celda_espaciado").value);

                    document.getElementById("abrir_guardar_url").value = url;
                }

                
                //Funcion que lee una URL y carga el mundo (sin recargar la pagina):
                function cargar_mundo()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }
                    
                    var url = document.getElementById("abrir_guardar_url").value;
                    
                    se_ha_enviado_tablero(url);
                }

                
                //Funcion que se activa al pulsar una tecla:
                function tecla_pulsada(e, evento_actual)
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { borrar = pintar = false; return; }

                    //Si el primer evento esta vacio, se le introduce como valor el evento actual (el que ha llamado a esta funcion):
                    if (primer_evento == "") { primer_evento = evento_actual; }
                    //Si el primer evento no es igual al evento actual (el que ha llamado a esta funcion), se vacia el primer evento (para que a la proxima llamada entre en la funcion) y se sale de la funcion:
                    if (primer_evento != evento_actual) { primer_evento = ""; borrar = pintar = false; return; }

                    //Capturamos la tacla pulsada (o liberada), segun navegador:
                    if (e.keyCode) { var unicode = e.keyCode; }
                    //else if (event.keyCode) { var unicode = event.keyCode; }
                    else if (window.Event && e.which) { var unicode = e.which; }
                    else { var unicode = 8; } //Si no existe, por defecto se utiliza el Backspace.

                    //Si la tecla pulsada no es ni Shift (16) ni Control (17) ni Intro (13) ni Backspace (8) ni Espacio (32) ni Suprimir (46) ni D (68) ni E (69) ni 0 (45 o 48) sale de la funcion:
                    if (unicode != 16 && unicode != 17 && unicode != 13 && unicode != 8 && unicode != 32 && unicode != 46 && unicode != 68 && unicode != 69 && unicode != 45 && unicode != 48) { borrar = pintar = false; return; }
                    
                    //Si es Shift, Intro, Espacio, comienza a pintar:
                    if (unicode == 16 || unicode == 18 || unicode == 13)
                    {
                        pintar = true;
                    }
                    //...pero si no, comienza a borrar:
                    else { borrar = true; }
                }

                
                //Funcion que aplica el nuevo alto y ancho del tablero:
                function modificar_tablero()
                {
                    //Recoge el alto y ancho enviados:
                    var tablero_ancho_enviado = parseInt(document.getElementById("tablero_x").value);
                    var tablero_alto_enviado = parseInt(document.getElementById("tablero_y").value);
                    
                    //Si no son valores correctos, lo recoge como un error:
                    var errores = "";
                    if (isNaN(tablero_ancho_enviado) || tablero_ancho_enviado < tablero_ancho_minimo || tablero_ancho_enviado > tablero_ancho_maximo) { errores += "El ancho del tablero debe ser un numero entre " + tablero_ancho_minimo + " y " + tablero_ancho_maximo + "<br>"; }
                    if (isNaN(tablero_alto_enviado) || tablero_alto_enviado < tablero_alto_minimo || tablero_alto_enviado > tablero_alto_maximo) { errores += "El alto del tablero debe ser un numero entre " + tablero_alto_minimo + " y " + tablero_alto_maximo + "<br>"; }
                    
                    //Deja de mostrar el mensaje, por si acaso antes lo estaba mostrando:
                    mostrar_alerta("");
                    
                    //Si han habido errores, los muestra y sale de la funcion:
                    if (errores != "")
                    {
                        //Muestra el error:
                        mostrar_alerta("<h2>Han habido los siguientes errores:</h2>" + errores);
                        //Restaura valores del formulario:
                        document.getElementById("tablero_x").value = tablero_ancho;
                        document.getElementById("tablero_y").value = tablero_alto;
                        //Sale de la funcion:
                        return;
                    }
                    //...pero si no, aplica las opciones:
                    else
                    {
                        //Para los ciclos por si ya existian:
                        parar_ciclos();

                        //Si aun habia algun interval de modificar la velocidad de los ciclos, se para por si acaso:
                        clearInterval(modificando_velocidad);

                        //Define como que todavia no se ha comenzado:
                        se_ha_comenzado = false;
                    
                        //Define como que el juego no esta en pausa:
                        juego_pausado = false;
                    
                        //Deselecciona los botones del panel inferior (por si habia alguno seleccionado):
                        seleccionar_boton('', 2);

                        //Aplica las opciones y crea el tablero:
                        tablero_ancho = tablero_ancho_enviado;
                        tablero_alto = tablero_alto_enviado;
                        mostrar_mensaje("Creando tablero...");
                        setTimeout("crear_tablero(); mostrar_mensaje('');", 10);
                    }
                }

                
                //Funcion que obtiene una variable por get:
                function obtener_variable_get(variable, url)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    var variable_url = "";

                    variable = variable.toLowerCase();
                    
                    if (url.indexOf("?" + variable + "=") != -1 || url.indexOf("&" + variable + "=") != -1)
                    {
                        var variable_url_sucia = "";
                        if (url.indexOf("?" + variable + "=") != -1) { variable_url_sucia = url.substring(url.indexOf("?" + variable + "=")+variable.length+2); }
                        else { variable_url_sucia = url.substring(url.indexOf("&" + variable + "=")+variable.length+2); }

                        if (variable_url_sucia.indexOf("&") == -1)
                        {
                            variable_url = variable_url_sucia.substring(0);
                        }
                        else
                        {
                            variable_url = variable_url_sucia.substring(0, variable_url_sucia.indexOf("&"));
                        }
                    }

                    variable_url = unescape(variable_url);

                    return variable_url;
                }


                //Funcion que comprueba si se ha enviado un tablero por GET:
                function se_ha_enviado_tablero(url)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Define si se ha enviado o no el tablero:
                    var se_ha_enviado = false;

                    //URL completa:
                    //var url = window.location.href;

                    //Si la url esta vacia, sale de la funcion:
                    if (url == "") { return; }

                    //Se extrae el contenido de la variable "mundo" enviada por GET:
                    var tablero_url = obtener_variable_get("world", url);
   
                    //Se extrae el contenido de la variable "width" enviada por GET:
                    var tablero_ancho_url = parseInt(obtener_variable_get("width", url));

                    //Se extrae el contenido de la variable "height" enviada por GET:
                    var tablero_alto_url = parseInt(obtener_variable_get("height", url));
                    
                    //Se extrae el contenido de la variable "speed" enviada por GET:
                    var speed_url = parseInt(obtener_variable_get("speed", url));

                    //Se extrae el contenido de la variable "hidemenu" enviada por GET:
                    var hidemenu_url = obtener_variable_get("hidemenu", url);
                    if (hidemenu_url != "") { hidemenu_url = parseInt(hidemenu_url); }

                    //Se extrae el contenido de la variable "hidemenu" enviada por GET:
                    var hidecontrols_url = obtener_variable_get("hidecontrols", url);
                    if (hidecontrols_url != "") { hidecontrols_url = parseInt(hidecontrols_url); }

                    //Se extrae el contenido de la variable "hidemenu" enviada por GET:
                    var hideinfo_url = obtener_variable_get("hideinfo", url);
                    if (hideinfo_url != "") { hideinfo_url = parseInt(hideinfo_url); }

                    //Se extrae el contenido de la variable "undrawable" enviada por GET:
                    var undrawable_url = obtener_variable_get("undrawable", url);
                    if (undrawable_url != "") { undrawable_url = parseInt(undrawable_url); }

                    //Se extrae el contenido de la variable "cell_width" enviada por GET:
                    var cellwidth_url = parseInt(obtener_variable_get("cellwidth", url));

                    //Se extrae el contenido de la variable "cellheight" enviada por GET:
                    var cellheight_url = parseInt(obtener_variable_get("cellheight", url));

                    //Se extrae el contenido de la variable "cellpadding" enviada por GET:
                    var cellpadding_url = parseInt(obtener_variable_get("cellpadding", url));
                    
                    //alert("Tablero: " + tablero_url + "\nAncho: " + tablero_ancho_url + "\nAlto: " + tablero_alto_url);

                    var errores = "";

                    //Si se ha enviado una velocidad:
                    if (speed_url != "" && speed_url > 0)
                    {
                        //Si se ha enviado bien, la pone:
                        if (!isNaN(speed_url) && speed_url >= ciclos_milisegundos_minimo && speed_url <= ciclos_milisegundos_maximo) { ciclos_milisegundos = speed_url; document.getElementById('velocidad_ciclos').innerHTML = ciclos_milisegundos; }
                        //...pero si no, guarda su error:
                        else { errores += "La velocidad debe ser un numero entre " + ciclos_milisegundos_minimo + " y " + ciclos_milisegundos_maximo + "<br>"; }
                    }
                    //Si se ha enviado la variable de esconder el menu y no es un cero, se esconde:
                    if (hidemenu_url != "" && hidemenu_url != 0 && hidemenu_url != "0")
                    {
                        document.getElementById('menu_superior').style.visibility = "hidden";
                    } else { document.getElementById('menu_superior').style.visibility = "visible"; }
                    //Si se ha enviado la variable de esconder el menu inferior (controles) y no es un cero, se esconde:
                    if (hidecontrols_url != "" && hidecontrols_url != 0 && hidecontrols_url != "0")
                    {
                        document.getElementById('panel').style.visibility = "hidden";
                    } else { document.getElementById('panel').style.visibility = "visible"; }
                    //Si se ha enviado la variable de esconder el panel inferior (informacion) y no es un cero, se esconde:
                    if (hideinfo_url != "" && hideinfo_url != 0 && hideinfo_url != "0")
                    {
                        document.getElementById('panel2').style.visibility = "hidden";
                    } else { document.getElementById('panel2').style.visibility = "visible"; }
                    //Si se ha enviado la variable de no poder pintar, no dejara pintar:
                    if (undrawable_url != "" && undrawable_url != 0 && undrawable_url != "0")
                    {
                        se_puede_pintar = false;
                    } else { se_puede_pintar = true; }
                    //Si se ha enviado un ancho de celda:
                    if (cellwidth_url != "" && cellwidth_url > 0)
                    {
                        //Si se ha enviado bien, la pone:
                        if (!isNaN(cellwidth_url) && cellwidth_url >= celda_ancho_minimo && cellwidth_url <= celda_ancho_maximo) { celda_ancho = cellwidth_url; }
                        //...pero si no, guarda su error:
                        else { errores += "El ancho de la celda debe ser un numero entre " + celda_ancho_minimo + " y " + celda_ancho_maximo + "<br>"; }
                    }
                    //Si se ha enviado un ancho de celda:
                    if (cellheight_url != "" && cellheight_url > 0)
                    {
                        //Si se ha enviado bien, la pone:
                        if (!isNaN(cellheight_url) && cellheight_url >= celda_alto_minimo && cellheight_url <= celda_alto_maximo) { celda_alto = cellheight_url; }
                        //...pero si no, guarda su error:
                        else { errores += "El alto de la celda debe ser un numero entre " + celda_alto_minimo + " y " + celda_alto_maximo + "<br>"; }
                    }
                    //Si se ha enviado un ancho de celda:
                    if (cellpadding_url != "" && cellpadding_url > 0)
                    {
                        //Si se ha enviado bien, la pone:
                        if (!isNaN(cellpadding_url) && cellpadding_url >= celda_espaciado_minimo && cellpadding_url <= celda_espaciado_maximo) { celda_espaciado = cellpadding_url; }
                        //...pero si no, guarda su error:
                        else { errores += "El espaciado entre celdas debe ser un numero entre " + celda_espaciado_minimo + " y " + celda_espaciado_maximo + "<br>"; }
                    }
                    //Comprueba si se han enviado bien o no los demas datos para guardar su error si no:
                    if (tablero_ancho_url > 0 && tablero_ancho_url != "" && (isNaN(tablero_ancho_url) || tablero_ancho_url < tablero_ancho_minimo || tablero_ancho_url > tablero_ancho_maximo)) { errores += "El ancho del tablero debe ser un numero entre " + tablero_ancho_minimo + " y " + tablero_ancho_maximo + "<br>"; }
                    if (tablero_alto_url > 0 && tablero_alto_url != "" && (isNaN(tablero_alto_url) || tablero_alto_url < tablero_alto_minimo || tablero_alto_url > tablero_alto_maximo)) { errores += "El alto del tablero debe ser un numero entre " + tablero_alto_minimo + " y " + tablero_alto_maximo + "<br>"; }

                    //Se extrae el contenido de la variable "spherical" enviada por GET y se aplica si hace falta:
                    var spherical_url = obtener_variable_get("spherical", url);
                    if (spherical_url != "" && spherical_url != "0" && spherical_url != 0) { mundo_esferico = true; document.getElementById("boton_mundo_esferico").style.border = '1px solid #556655'; }

                    //Se extrae el contenido de la variable "multicolor" enviada por GET y se aplica si hace falta:
                    var multicolor_url = obtener_variable_get("multicolor", url);
                    if (multicolor_url != "" && multicolor_url != "0" && multicolor_url != 0) { multicolor = true; document.getElementById("boton_multicolor").style.border = '1px solid #556655'; }

                    //Deja de mostrar el mensaje, por si acaso antes lo estaba mostrando:
                    mostrar_alerta("");
                    
                    //Si han habido errores, los muestra y sale de la funcion:
                    if (errores != "")
                    {
                        //Muestra el error:
                        mostrar_alerta("<h2>Han habido los siguientes errores:</h2>" + errores);
                    }

                    //Si todo ha sido enviado corectamente, lo obtiene:
                    if (tablero_ancho_url != 0 && tablero_alto_url != 0 && tablero_ancho_url != "" && tablero_alto_url != "" && !isNaN(tablero_ancho_url) && !isNaN(tablero_alto_url) && tablero_ancho_url >= tablero_ancho_minimo && tablero_ancho_url <= tablero_ancho_maximo && tablero_alto_url >= tablero_alto_minimo && tablero_alto_url <= tablero_alto_maximo)
                    {
                        obtener_tablero_enviado(url, tablero_url, tablero_ancho_url, tablero_alto_url);
                        se_ha_enviado = true;
                    }
                    else
                    {
                        //Se define como que no se ha enviado nada:
                        se_ha_enviado = false;
                    }
                    
                    return se_ha_enviado;
                }


                //Funcion que modifica la matriz del tablero con un tablero enviado:
                function modificar_matriz_tablero(tablero_url)
                {
                    var z = 0, caracter = 0;
                    for (var x = 0; x < tablero_alto; x++)
                    {
                        for (var y = 0; y < tablero_ancho; y++)
                        {
                            //caracter = (tablero_url.substring(z, z+1)) ? 1 : 0;
                            //caracter = tablero_url.substring(z, z+1);
                            caracter = (tablero_url.substring(z, z+1) != 0) ? 1 : 0;
                            tablero[x][y] = caracter;
                            //alert(tablero[x][y]);
                            z++;
                        }
                    }
                }
                

                //Funcion que obtiene 
                function obtener_tablero_enviado(url, tablero_url, tablero_ancho_url, tablero_alto_url)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Se extrae el contenido de la variable "play" enviada por GET:
                    var play_url = obtener_variable_get("play", url);

                    //Pone el alto y ancho enviado:
                    tablero_ancho = tablero_ancho_url;
                    tablero_alto = tablero_alto_url;
                    
                    //Crea el tablero virgen con el nuevo ancho y alto, modifica la matriz y luego la representa pintando el mapa:
                    mostrar_mensaje("Creando tablero...");
                    var reproducir_automaticamente = "";
                    if (play_url != "" && play_url != "0" && play_url != 0) { reproducir_automaticamente = " juego_pausado = false; mostrar_mensaje(''); comenzar_ciclos(ciclos_milisegundos); seleccionar_boton(document.getElementById('boton_play'), 2);"; }
                    setTimeout("crear_tablero(); modificar_matriz_tablero('" + tablero_url + "'); pintar_tablero(); mostrar_mensaje('');" + reproducir_automaticamente, 10);
                }

                
                //Funcion que pinta el tablero:
                function pintar_tablero()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Define como que todavia no hay habitantes (para contarlos):
                    poblacion = 0;

                    var numero_celda = 0;
                    for (var x = 0; x < tablero_alto; x++)
                    {
                        for (var y = 0; y < tablero_ancho; y++)
                        {
                            if (tablero[x][y] != 0)
                            {
                                poblacion++;
                                if (multicolor) { document.getElementById("celda_" + numero_celda).style.background = colores["multicolor"][calcular_adyacentes(numero_celda)]; }
                                else { document.getElementById("celda_" + numero_celda).style.background = colores["celda_ocupada"]; }
                            } 
                            numero_celda++;
                        }
                    }
                    
                    if (poblacion > 0) { extinta = false; }
                    
                    //Actualiza el panel (por la poblacion):
                    actualizar_panel();
                }


                //Funcion que inicia el juego por primera vez:
                function iniciar_juego_primera_vez()
                {
                    //Si se ha enviado un mapa por GET, lo recoge y lo muestra y sale de la funcion:
                    if (window.location.href && se_ha_enviado_tablero(window.location.href)) { return; }
                    //...pero si no, crea el tablero (hace setTimeout para que de tiempo al navegador a mostrar el mensaje):
                    else
                    {
                        mostrar_mensaje("Creando tablero...");
                        setTimeout("crear_tablero(); mostrar_mensaje('');", 10);
                    }
                }


                //Funcion que crea el tablero vacio:
                function crear_tablero()
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    //Se bloquea el juego:
                    

                    //Define como que no hay ninguna celda anterior marcada:
                    ultima_celda_resaltada = -1;

                    //Se restauran los valores de las variables:
                    numero_ciclos = 0;
                    ciclos_estable = -1;
                    extinta = true;
                    poblacion = 0;
                    //Se actualiza el marcador:
                    actualizar_panel();
                    //Variable para guardar el codigo HTML generado (solo si la grandaria no es la misma):
                    var codigo_html = "";
                    //Variable para guardar el numero de celda:
                    var numero_celda = 0;
                    //Variables que guardaran la posicion de las celdas:
                    var celda_left = 0;
                    var celda_top = 0;
                    //Guarda el color de fondo de la celda:
                    var celda_fondo = colores["celda_vacia"];
                    //Si el tablero es la primera vez que se crea o no tiene la misma grandaria, borra la zona de juego:
                    
                    if (tablero_alto_ultimo == 0 && tablero_ancho_ultimo == 0 || tablero_alto_ultimo != 0 && tablero_ancho_ultimo != 0 && (tablero_ancho != tablero_ancho_ultimo || tablero_alto != tablero_alto_ultimo))
                    {
                        document.getElementById("zona_juego").innerHTML = "";
                        //Crea el primer indice (filas) en la matriz del tablero:
                        tablero = new Array(tablero_alto);
                    }
                    //Recorre las filas:
                    for (var x = 0; x < tablero_alto; x++)
                    {
                        //Si el tablero es la primera vez que se crea o no tiene la misma grandaria, crea el segundo indice de la matriz del tablero (columnas):
                        if (tablero_alto_ultimo == 0 && tablero_ancho_ultimo == 0 || tablero_alto_ultimo != 0 && tablero_ancho_ultimo != 0 && (tablero_ancho != tablero_ancho_ultimo || tablero_alto != tablero_alto_ultimo))
                        {
                            //Crea el segundo indice (columnas) en la matriz del tablero:
                            tablero[x] = new Array(tablero_ancho);
                        }
                        //Recorre las columnas:
                        for (var y = 0; y < tablero_ancho; y++)
                        {
                            //Si no es la primera vez que se crea y es la misma grandaria, solo lo borra visualmente:
                            
                            if (tablero_alto_ultimo != 0 && tablero_ancho_ultimo != 0 && tablero_ancho == tablero_ancho_ultimo && tablero_alto == tablero_alto_ultimo)
                            {
                               
                                //Si la celda estaba ocupada, la borra:
                                if (tablero[x][y] != 0) { document.getElementById("celda_" + numero_celda).style.background = colores["celda_vacia"]; }
                            }
                            //...pero si no, lo crea (vacio):
                            else
                            {
                                celda_left = (celda_ancho + celda_espaciado) * y + celda_espaciado;
                                celda_top = (celda_alto + celda_espaciado) * x + celda_espaciado;
                                
                                codigo_html += '<div id="celda_' + numero_celda + '" style="position:absolute; left:' + celda_left + 'px; top:' + celda_top + 'px; width:' + celda_ancho + 'px; height:' + celda_alto + 'px; border:0px; padding:0px; background:' + celda_fondo + '; color:#002200; text-align:center; line-height:' + celda_alto + 'px; text-decoration:none; font-family:arial; font-size:' + eval(parseInt((celda_alto+celda_ancho)/8)) + 'px; -moz-user-select:none; cursor:pointer; cursor:hand; z-index:2;" onMouseDown="pintar = true;" onMouseUp="pintar = false;" onMouseMove="borrar_celda(' + numero_celda + '); pintar_celda(' + numero_celda + ');" onClick="pintar = true; pintar_celda(' + numero_celda + '); pintar = false;" onContextMenu="pintar = false; borrar = true; borrar_celda(' + numero_celda + '); borrar = false; return false;" onDblClick="pintar = false; borrar = true; borrar_celda(' + numero_celda + '); borrar = false; return false;" onMouseOver="resaltar_celda(' + numero_celda + ');" onMouseOut="resaltar_celda(-1);" onSelectStart="return false;"></div>';
                            }
                            //Borra la matriz del tablero:
                            tablero[x][y] = 0;
                            //Incrementa el numero de celda:
                            numero_celda++;
                        }
                    }
                    //Si el tablero es la primera vez que se crea o no tiene la misma grandaria, aplica el codigo generado a la zona de juego y tambien el alto y ancho correspondiente:
//                   
                    if (tablero_alto_ultimo == 0 && tablero_ancho_ultimo == 0 || tablero_alto_ultimo != 0 && tablero_ancho_ultimo != 0 && (tablero_ancho != tablero_ancho_ultimo || tablero_alto != tablero_alto_ultimo))
                    {
                        //Se aplica el codigo HTML generado:
                        document.getElementById("zona_juego").innerHTML += codigo_html;
                        //Se aplica el alto y el ancho correspondiente (utiliza la ultima celda generada, que es la inferior derecha):
                        document.getElementById("zona_juego").style.width = parseInt(document.getElementById("celda_" + eval(numero_celda-1)).style.left) + parseInt(document.getElementById("celda_" + eval(numero_celda-1)).style.width) + celda_espaciado + "px";
                        document.getElementById("zona_juego").style.height = parseInt(document.getElementById("celda_" + eval(numero_celda-1)).style.top) + parseInt(document.getElementById("celda_" + eval(numero_celda-1)).style.height) + celda_espaciado + "px";
                    }
                    //Se guarda el ancho y alto del tablero para saber la proxima vez si se ha modificado:
                    tablero_ancho_ultimo = tablero_ancho;
                    tablero_alto_ultimo = tablero_alto;
                    //Se pone el alto y ancho del tablero en los campos del formulario:
                    document.getElementById("tablero_x").value = tablero_ancho;
                    document.getElementById("tablero_y").value = tablero_alto;
                    //Posiciona verticalmente la zona de juego, segun si se ve o no el menu superior:
                    if (document.getElementById("menu_superior").style.visibility == "hidden") { document.getElementById("zona_juego").style.top = parseInt(document.getElementById("zona_juego").style.left) + "px"; }
                    else { document.getElementById("zona_juego").style.top = parseInt(document.getElementById("menu_superior").style.top) + parseInt(document.getElementById("menu_superior").style.height) + 10 + "px"; }
                    //Situan los paneles, el mensaje y la informacion del autor (segun si estan visibles los paneles de abajo o no):
                    document.getElementById("panel").style.left = document.getElementById("zona_juego").style.left;
                    document.getElementById("panel2").style.left = document.getElementById("mensaje").style.left = parseInt(document.getElementById("panel").style.left) + parseInt(document.getElementById("panel").style.width) + 10 + "px";
                    document.getElementById("panel").style.top = document.getElementById("panel2").style.top = parseInt(document.getElementById("zona_juego").style.top) + parseInt(document.getElementById("zona_juego").style.height) + 10 + "px";
                    document.getElementById("mensaje").style.top = parseInt(document.getElementById("panel2").style.top) + ((parseInt(document.getElementById("panel2").style.height) - parseInt(document.getElementById("mensaje").style.height)) / 2) + "px";
                    if (document.getElementById("panel").style.visibility == "hidden" && document.getElementById("panel2").style.visibility == "hidden") { document.getElementById("informacion").style.top = parseInt(document.getElementById("zona_juego").style.top) + parseInt(document.getElementById("zona_juego").style.height) + 10 + "px"; }
                    else { document.getElementById("informacion").style.top = parseInt(document.getElementById("panel").style.top) + parseInt(document.getElementById("panel").style.height) + 10 + "px"; }
                    //Se define como que aun no se ha comenzado el juego:
                    se_ha_comenzado = false;
                    //Se desbloquea el juego:
                    //juego_bloqueado = true;
                }

                
                //Funcion que llena el tablero de forma aleatoria:
                function rellenar_tablero_aleatoriamente(minimo, maximo)
                {
                    //Si la pagina no se ha cargado todavia, sale de la funcion:
                    if (!pagina_cargada) { return; }

                    if (minimo > maximo) { maximo = minimo + 1; }
                    var puestos = 0, numero_celda, x = 0, y = 0;
                    
                    do
                    {
                        y = Math.floor(Math.random() * tablero_alto);
                        x = Math.floor(Math.random() * tablero_ancho);
                        if (puestos < maximo)
                        {
                            valor = Math.floor(Math.random() * 2);
                            if (valor != 0) { tablero[y][x] = valor; puestos++; }
                            
                        }
                        if (puestos > minimo && Math.floor(Math.random() * 100) > 80) { break; }
                    } while (puestos < maximo);
                    
                    pintar_tablero();
                }

                
               

                //Funcion que modifica la velocidad de los ciclos:
                function modificar_velocidad_ciclos(incremento, constante)
                {
                    //Si el incremento es 0, para de modificar su velocidad:
                    if (incremento == 0) { clearInterval(modificando_velocidad); modificando_velocidad = setInterval("", 9999); }
                    //...pero si no, se aplica el nuevo incremento (siempre que sea un numero valido):
                    else if (!isNaN(incremento))
                    {
                        //Si se esta pulsando el boton del raton, modifica la velocidad cada cierto tiempo:
                        if (constante)
                        {
                            clearInterval(modificando_velocidad);
                            var instrucciones = "if (ciclos_milisegundos + " + incremento + " >= ciclos_milisegundos_minimo && ciclos_milisegundos + " + incremento + " <= ciclos_milisegundos_maximo)" +
                                                "{" +
                                                "   ciclos_milisegundos += " + incremento + "; ";
                            if (se_ha_comenzado && !juego_pausado) { instrucciones += "comenzar_ciclos(ciclos_milisegundos);"; }
                            else { instrucciones += "if (document.getElementById('velocidad_ciclos')) { document.getElementById('velocidad_ciclos').innerHTML = ciclos_milisegundos; }"; }
                            instrucciones += " }";
                            modificando_velocidad = setInterval(instrucciones, 10);
                        }
                        //...pero si no, solo se modifica una vez:
                        else
                        {
                             if (ciclos_milisegundos + incremento >= ciclos_milisegundos_minimo && ciclos_milisegundos + incremento <= ciclos_milisegundos_maximo)
                             {
                                ciclos_milisegundos += incremento;
                                if (se_ha_comenzado && !juego_pausado) { comenzar_ciclos(ciclos_milisegundos); }
                                else
                                {
                                    if (document.getElementById('velocidad_ciclos')) { document.getElementById('velocidad_ciclos').innerHTML = ciclos_milisegundos; }
                                }
                             }
                        }
                    }
                }


                //Funcion que comienza a hacer los ciclos de forma continuada:
                function comenzar_ciclos(milisegundos)
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }
                    
                    //Para los ciclos por si ya existian:
                    parar_ciclos();

                    //Si aun habia algun interval de modificar la velocidad de los ciclos, se para por si acaso:
                    
                    
                    //Define como que ya se ha comenzado:
                    se_ha_comenzado = true;

                    //Pone la velocidad de los ciclos en el menu superior:
                    document.getElementById("velocidad_ciclos").innerHTML = milisegundos;

                    //Comienzan los ciclos:
                    ciclos = setInterval("hacer_ciclo();", milisegundos);
                }
                
                
                //Funcion que para de hacer los ciclos de forma continuada:
                function parar_ciclos()
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }

                    clearInterval(ciclos);

                   
                }
                

                //Funcion que pinta una celda:
                function pintar_celda(celda)
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }

                    //Si no se puede pintar, sale de la funcion:
                    if (!se_puede_pintar) { return; }

                    //Si se debe pintar:
                    if (pintar)
                    {
                        //Se marca la celda en la matriz como ya pintada:
                        var fila = Math.floor(celda / tablero_ancho);
                        var columna = celda % tablero_ancho;
                        if (tablero[fila][columna] == 0)
                        {
                            tablero[fila][columna] = 1;
                            //Define un habitante mas y actualiza el panel:
                            poblacion++;
                            if (poblacion > 0) { extinta = false; }
                            actualizar_panel();
                            //Se pinta la celda (segun si hay multicolor o no):
                            if (multicolor)
                            {
                                //Pinta la celda actual:
                                document.getElementById("celda_" + celda).style.background = colores["multicolor"][calcular_adyacentes(celda)];
                                //Pinta las celdas adyacentes (ya que ahora tienen un vecino mas):
                                pintar_celdas_adyacentes_multicolor(celda);
                            }
                            else { document.getElementById("celda_" + celda).style.background = colores["celda_ocupada"]; } //Si no hay multicolor, pinta la celda actual y ya esta.
                            
                        }
                    }
                }
                

                //Funcion que borra una celda:
                function borrar_celda(celda)
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }

                    //Si no se puede pintar, sale de la funcion:
                    if (!se_puede_pintar) { return; }

                    var fila = Math.floor(celda / tablero_ancho);
                    var columna = celda % tablero_ancho;

                    //Se borra la celda, siempre que no este ya vacia:
                    if (borrar && tablero[fila][columna] != 0)
                    {
                        tablero[fila][columna] = 0;
                        document.getElementById("celda_" + celda).style.background = colores["celda_vacia"];
                        //Si hay multicolor, pinta las celdas adyacentes (ya que ahora tienen un vecino menos):
                        if (multicolor) { pintar_celdas_adyacentes_multicolor(celda); }
                                                //Define un habitante menos y actualiza el panel:
                        poblacion--;
                        if (poblacion > 0) { extinta = false; }
                        actualizar_panel();
                        return false;
                    }
                }


                //Funcion que pinta las celdas adyacentes a otra (solo en multicolor):
                function pintar_celdas_adyacentes_multicolor(celda)
                {
                    //Calcula la fila y la columna de la celda enviada:
                    var fila = Math.floor(celda / tablero_ancho);
                    var columna = celda % tablero_ancho;

                    //Vector que guarda las celdas ya contadas:
                    var celdas_contadas = Array(8);
                    //Contador para saber cuantas celdas han sido ya calculadas:
                    var celdas_contadas_contador = 0;
                    //Variable que guarda la celda actual del loop:
                    var celda_actual = 0;

                    //Recorre las filas:
                    var celda_actual = 0;
                    for (var y = fila-1; y <= fila+1; y++)
                    {
                        //Recorre las columnas:
                        for (var x = columna-1; x <= columna+1; x++)
                        {
                            //Se guarda la fila y la columna de la casilla del loop actual:
                            f = y;
                            c = x;
                            //Si el mundo es esferico, calcula la nueva posicion de las casillas si se pasan de los limites:
                            if (mundo_esferico)
                            {
                                if (f < 0) { f = tablero_alto + f; } //Si la fila es negativa, comienza por el final.
                                else if (f >= tablero_alto) { f = f - tablero_alto; } //Si la fila se pasa del final, comienza por el principio.
                                if (c < 0) { c = tablero_ancho + c; } //Si la columna es negativa, comienza por el final.
                                else if (c >= tablero_ancho) { c = c - tablero_ancho; } //Si la columna se pasa del final, comienza por el principio.
                            }
                            //Si la celda vecina existe (no es invalida):
                            if (f >= 0 && c >= 0 && f < tablero_alto && c < tablero_ancho)
                            {
                                //Si no esta vacia y si no es la misma celda (la enviada):
                                if (tablero[f][c] != 0 && (f != fila || c != columna))
                                {
                                    celda_actual = (f * tablero_ancho) + c;
                                    //Solo cambia su color si este no se habia cambiado antes:
                                    if (!existe_en_vector(celda_actual, celdas_contadas, celdas_contadas_contador)) { document.getElementById("celda_" + celda_actual).style.background = colores["multicolor"][calcular_adyacentes(celda_actual)]; }
                                    celdas_contadas[celdas_contadas_contador] = celda_actual;
                                    celdas_contadas_contador++;
                                   
                                }
                            } 
                        }
                    }
                }                

                //Funcion que hace el ciclo (las 3 normas basicas):
                function hacer_ciclo()
                {
                    //Si la pagina no se ha cargado todavia o el juego esta bloqueado, sale de la funcion:
                    if (!pagina_cargada || juego_bloqueado) { return; }

                    //Bloquea el juego:
                    juego_bloqueado = true;
                    
                    //Variable que define si la poblacion ya es estable o no:
                    es_estable = true;
                    
                    //Define como que no hay habitantes (para contarlos desde cero):
                    poblacion = 0;
                    
                    //Variable que guarda el numero de celda en cada itineracion:
                    var numero_celda = 0;
                    
                    //Matriz auxiliar para ir guardando los vecinos:
                    var vecinos = new Array(tablero_alto);
                    extinta = true;
                   
                    for (var x = 0; x < tablero_alto; x++)
                    {
                        vecinos[x] = new Array(tablero_ancho);
                        for (var y = 0; y < tablero_ancho; y++)
                        {
                            //Guarda los vecinos:
                            vecinos[x][y] = calcular_adyacentes(numero_celda);
                            //Si hay poblacion, declara que no esta extinta:
                            if (vecinos[x][y] > 0) { extinta = false; }
                            numero_celda++;
                            
                        }
                        
                    }
                    
                    
                    //Recorre las filas:
                    numero_celda = 0;
                    for (x = 0; x < tablero_alto; x++)
                    {
                        //Recorre las columnas:
                        for (y = 0; y < tablero_ancho; y++)
                        {
                            //Hace el ciclo:
                            if (vecinos[x][y] >= 4 && tablero[x][y] != 0)
                            {
                                tablero[x][y] = 0;
                                es_estable = false;
                                //celda_cambiada = true;
                                document.getElementById("celda_" + numero_celda).style.background = colores["celda_vacia"];
                            }
                            else if (vecinos[x][y] <= 1 && tablero[x][y] != 0)
                            {
                                tablero[x][y] = 0;
                                es_estable = false;
                              
                                document.getElementById("celda_" + numero_celda).style.background = colores["celda_vacia"];
                            }
                            else if (vecinos[x][y] == 3 && tablero[x][y] == 0)
                            {
                                tablero[x][y] = 1;
                                es_estable = false;
                               
                                if (!multicolor) { document.getElementById("celda_" + numero_celda).style.background = colores["celda_ocupada"]; }
                            }
                            numero_celda++;
                            //Cuenta los habitantes:
                            if (tablero[x][y] != 0) { poblacion++; }
                        }
                    }

                    //Si hay multicolor y algun habitante, les cambia el color (si se hiciera antes, solo tendrian el color segun los vecinos anteriores y no los actuales despues del ciclo):
                    if (multicolor && poblacion > 0)
                    {
                        transformar_colores(true);
                    }
                    
                    
                    

                    
                    

                    //Si el juego es estable y es el primer ciclo en que ocurre, se guarda:
                    estable = es_estable;
                    if (estable && ciclos_estable == -1) { ciclos_estable = numero_ciclos; }
                    else if (!estable) { ciclos_estable = -1; }

                    //Incrementa el numero de ciclos que se han hecho:
                    numero_ciclos++;
                    
                    //Actualiza el panel:
                    actualizar_panel();

                    //Desbloquea el juego:
                    juego_bloqueado = false;
                   
                    //Retorna si la poblacion ya es estable o no:
                    return estable;
                }
                
                
                //Funcion que devuelve el numero de individuos adyacentes de una celda:
                function calcular_adyacentes(celda)
                {
                    //Variable que guardara el numero de adyacentes (vecinos) que tiene la celda enviada:
                    var vecinos = 0;
                    
                    //Calcula la fila y la columna de la celda enviada:
                    var fila = Math.floor(celda / tablero_ancho);
                    var columna = celda % tablero_ancho;

                    //Vector que guarda las celdas ya contadas:
                    var celdas_contadas = Array(8);
                    //Contador para saber cuantas celdas han sido ya calculadas:
                    var celdas_contadas_contador = 0;
                    //Variable que guarda la celda actual del loop:
                    var celda_actual = 0;

                    //Recorre las filas:
                    for (var y = fila-1; y <= fila+1; y++)
                    {
                        //Recorre las columnas:
                        for (var x = columna-1; x <= columna+1; x++)
                        {
                            //Se guarda la fila y la columna de la casilla del loop actual:
                            f = y;
                            c = x;
                            //Si el mundo es esferico, calcula la nueva posicion de las casillas si se pasan de los limites:
                            if (mundo_esferico)
                            {
                                if (f < 0) { f = tablero_alto + f; } //Si la fila es negativa, comienza por el final.
                                else if (f >= tablero_alto) { f = f - tablero_alto; } //Si la fila se pasa del final, comienza por el principio.
                                if (c < 0) { c = tablero_ancho + c; } //Si la columna es negativa, comienza por el final.
                                else if (c >= tablero_ancho) { c = c - tablero_ancho; } //Si la columna se pasa del final, comienza por el principio.
                            }
                            //Si la celda vecina existe (no es invalida):
                            if (f >= 0 && c >= 0 && f < tablero_alto && c < tablero_ancho)
                            {
                                celda_actual = (f * tablero_ancho) + c;
                                //Solo se cuenta si la celda ya no se habia contado antes:
                                if (!existe_en_vector(celda_actual, celdas_contadas, celdas_contadas_contador)) { vecinos += tablero[f][c]; }
                                celdas_contadas[celdas_contadas_contador] = celda_actual;
                                celdas_contadas_contador++;
                            } 
                        }
                    }
                   
                    //Se resta ella misma (ya que se ha sumado):
                    vecinos -= tablero[fila][columna];
                    
                    //Retorna el numero de adyacentes (vecinos) que tiene la celda enviada:
                    return vecinos;
                }


                function existe_en_vector(valor_buscado, vector, indice_maximo)
                {
                    var encontrado = false;
                    
                    for (var x = 0; x <= indice_maximo; x++)
                    {
                        if (vector[x] == valor_buscado) { encontrado = true; break; }
                    }

                    return encontrado;
                }

            
                //Funcion que transforma de color normal a multicolor y viceversa:
                function transformar_colores()
                {
                    var numero_celda = 0;
                    var vecinos = 0;
                    for (x = 0; x < tablero_alto; x++)
                    {
                        //Recorre las columnas:
                        for (y = 0; y < tablero_ancho; y++)
                        {
                            if (tablero[x][y] != 0)
                            {
                                if (multicolor)
                                {
                                    vecinos = calcular_adyacentes(numero_celda);
                                    document.getElementById("celda_" + numero_celda).style.background = colores["multicolor"][vecinos];
                                }
                                else
                                {
                                    document.getElementById("celda_" + numero_celda).style.background = colores["celda_ocupada"];
                                }
                            }
                            
                            numero_celda++;
                        }
                    }
                }
        // -->

