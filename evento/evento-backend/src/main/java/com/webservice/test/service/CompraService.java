package com.webservice.test.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.test.model.dao.CompraDaoRepository;
import com.webservice.test.model.dao.EventoDaoRepository;
import com.webservice.test.model.entity.Compra;
import com.webservice.test.model.entity.Evento;

@Service
public class CompraService {
	
	@Autowired
	private CompraDaoRepository compraDaoRepository;
	
	@Autowired
	private EventoDaoRepository eventoDaoRepository; 
	
	public Compra save(Compra compra) {
		Compra updateCompra = compra;
		Optional<Evento> optionalEvento = eventoDaoRepository.findByIdEvento(updateCompra.getIdEvento());
		if(optionalEvento.isPresent()) {
			Evento updateEvento = optionalEvento.get();
			Double total = updateEvento.getPrecio()*updateCompra.getNumeroEntradas();
			updateCompra.setPagar(total - total*updateEvento.getPromocion().getDescuento()/100);
			if(updateCompra.getNumeroCompras()==null) {
				updateCompra.setNumeroCompras(0);
			}
			updateCompra.setNumeroCompras(updateCompra.getNumeroCompras()+1);
			compraDaoRepository.save(updateCompra);
			updateEvento.setCantidadEntradas(updateEvento.getCantidadEntradas() - updateCompra.getNumeroEntradas());
			
			eventoDaoRepository.save(updateEvento);
		}
		
		return updateCompra;
	}
	
	public void updateEvento() {
		
	}

}
